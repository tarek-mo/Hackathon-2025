import { Request, Response } from "express";
import Submission from "../models/Submission";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import axios from "axios";
import FormData from "form-data";
import Assignment from "../models/Assignment";

export const uploadSubmission = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { assignmentId, isSolution = "false" } = req.body;

    if (!assignmentId) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "assignmentId is required" });
    }

    if (!req.user) {
      fs.unlinkSync(req.file.path);
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.userId;
    const userRole = req.user.role;

    if (isSolution === "true" && userRole !== "professor") {
      fs.unlinkSync(req.file.path);
      return res
        .status(403)
        .json({ error: "Only professors can submit a solution" });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: "Assignment not found" });
    }

    if (new Date() > new Date(assignment.deadline)) {
      fs.unlinkSync(req.file.path);
      return res.status(403).json({ error: "Deadline has passed" });
    }

    const existingSubmission = await Submission.findOne({
      userId,
      assignmentId,
    });
    if (existingSubmission) {
      fs.unlinkSync(req.file.path);
      return res
        .status(409)
        .json({ error: "Submission already exists for this assignment" });
    }

    const newSubmission = new Submission({
      assignmentId,
      userId,
      filePath: req.file.path,
      isSolution: isSolution === "true",
      isAIGenerated: false,
      cheated: false,
    });

    const savedSubmission = await newSubmission.save();

    res
      .status(201)
      .json({ message: "Submission uploaded", submission: savedSubmission });

    // --- Cheating check (runs in background) ---
    const otherSubmissions = await Submission.find({
      assignmentId,
      _id: { $ne: savedSubmission._id },
      isSolution: false,
    });

    for (const other of otherSubmissions) {
      try {
        const form = new FormData();
        form.append("file1", fs.createReadStream(savedSubmission.filePath));
        form.append("file2", fs.createReadStream(other.filePath));

        const response = await axios.post(
          "http://localhost:5001/compare_pdfs",
          form,
          {
            headers: form.getHeaders(),
          }
        );

        const { similarity_percent } = response.data;

        if (similarity_percent > other.cheatFromFriendProbability) {
          other.cheatFromFriendProbability = similarity_percent;
          other.cheatedFromSubmission = savedSubmission._id;
          await other.save();

          savedSubmission.cheatFromFriendProbability = similarity_percent;
          savedSubmission.cheatedFromSubmission = other._id;
          await savedSubmission.save();
        }

        if (similarity_percent > savedSubmission.cheatFromFriendProbability) {
          savedSubmission.cheatFromFriendProbability = similarity_percent;

          savedSubmission.cheatedFromSubmission = other._id;
          await savedSubmission.save();
        }
      } catch (err) {
        console.error("Error comparing submissions:", err);
      }
    }

    // Recalculate cheatingCeil after processing
    const submissions = await Submission.find({ assignmentId });

    const total = submissions.reduce((sum, submission) => {
      return sum + Number(submission.cheatFromFriendProbability || 0);
    }, 0);

    const average = submissions.length > 0 ? total / submissions.length : 0;

    await Assignment.findByIdAndUpdate(assignmentId, {
      cheatingCeil: average + 5,
    });

    for (const submission of submissions) {
      const isCheater =
        Number(submission.cheatFromFriendProbability || 0) > average + 5;

      if (submission.cheated !== isCheater) {
        submission.cheated = isCheater;
        await submission.save();
      }
    }

    // 🧠 AI Detection
    const form = new FormData();
    form.append("file", fs.createReadStream(savedSubmission.filePath));

    const aiResponse = await axios.post("http://localhost:5002/upload", form, {
      headers: form.getHeaders(),
    });

    const { ai_detection } = aiResponse.data;

    savedSubmission.aiGeneratedProbability = ai_detection.ai_probability;
    await savedSubmission.save();
  } catch (error) {
    console.error("Upload Submission Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Delete submission
export const deleteSubmission = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id);

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    // Delete the physical file
    const filePath = path.resolve(submission.filePath);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    // Delete submission document
    await Submission.findByIdAndDelete(id);

    res.status(200).json({ message: "Submission deleted" });
  } catch (error) {
    console.error("Delete Submission Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  const { classId } = req.params;
  console.log("getSubmissions", classId);

  if (!classId) {
    return res.status(400).json({ error: "classId is required in the URL" });
  }

  try {
    // Get all assignment IDs for this class
    const assignments = await Assignment.find({ classId }).select("_id");
    const assignmentIds = assignments.map((a) => a._id);

    // Fetch submissions related to these assignments
    const submissions = await Submission.find({
      assignmentId: { $in: assignmentIds },
    })
      .select(
        "_id date aiGeneratedProbability cheated cheatedFromSubmission userId cheatFromFriendProbability"
      )
      .populate({
        path: "userId",
        select: "name email", // Populate user's name and email
      })
      .populate({
        path: "cheatedFromSubmission",
        populate: {
          path: "userId",
          select: "name", // Populate name of the user who was cheated from
        },
      })
      .exec();

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
