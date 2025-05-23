// controllers/classController.ts
import { Request, Response } from "express";
import ClassModel, { IClass } from "../models/Class";
import crypto from "crypto";
import User from "../models/User";
import Assignment from "../models/Assignment";

export const createClass = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name } = req.body;

    const userId = req.user?._id;
    if (!userId) return res.status(403).json({ message: "Unauthorized" });

    const joinCode = crypto.randomBytes(4).toString("hex"); // random 8-character code

    const newClass = await ClassModel.create({ name, userId, joinCode });

    res.status(201).json(newClass);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClass = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await ClassModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Class not found" });

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteClass = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const deleted = await ClassModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Class not found" });

    res.json({ message: "Class deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const joinClass = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.body;
    const userId = req.user!.userId;

    const classToJoin = await ClassModel.findOne({ joinCode: code });
    if (!classToJoin)
      return res.status(404).json({ message: "Invalid join code" });

    // Add user to class if not already in
    if (!classToJoin.enrolled_students.includes(userId)) {
      classToJoin.enrolled_students.push(userId);
      await classToJoin.save();
    }

    // Add class to student's enrolled list
    const student = await User.findById(userId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (!student.enrolled_in.includes(classToJoin._id)) {
      student.enrolled_in.push(classToJoin._id);
      await student.save();
    }

    res.status(200).json({ message: "Joined class successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllClasses = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;

    if (role === "professor") {
      const classes = await ClassModel.find({ userId });
      return res.json(classes);
    }

    if (role === "student") {
      const student = await User.findById(userId).populate("enrolled_in");
      return res.json(student?.enrolled_in || []);
    }

    // Shouldn't be reached due to auth middleware
    res.status(403).json({ message: "Unauthorized role" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getClassById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const classData = await ClassModel.findById(id)
      .populate("userId", "name email") // populate professor
      .populate("enrolled_students", "name email"); // populate students

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Get assignments for the class
    const assignments = await Assignment.find({ classId: id });

    res.status(200).json({
      class: classData,
      assignments,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
