import { Request, Response } from "express";
import Assignment from "../models/Assignment";
import Class from "../models/Class";

export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find assignment and populate class
    const assignment = await Assignment.findById(id).populate({
      path: "classId",
      populate: {
        path: "userId",
        select: "name email", // only return relevant professor fields
      },
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.status(200).json({
      ...assignment.toObject(),
      fileUrl: assignment.filePath
        ? `${req.protocol}://${req.get("host")}/uploads/${assignment.filePath}`
        : null,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const addAssignment = async (req: Request, res: Response) => {
  try {
    const { title, deadline, description, classId } = req.body;

    const filePath = req.file ? req.file.filename : undefined;

    const classExists = await Class.findById(classId);
    if (!classExists) return res.status(404).json({ error: "Class not found" });

    const newAssignment = await Assignment.create({
      title,
      deadline,
      description,
      classId,
      filePath,
    });

    res.status(201).json(newAssignment);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment)
      return res.status(404).json({ error: "Assignment not found" });

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
