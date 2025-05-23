import express from "express";
import {
  addAssignment,
  deleteAssignment,
  getAssignmentById,
} from "../controllers/assignmentController";
import upload from "../middleware/upload";
import { isProfessor } from "../middleware/isProfessor";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// Only professors can create/delete assignments
router.post("/", isProfessor, upload.single("file"), addAssignment);
router.delete("/:id", isProfessor, deleteAssignment);
router.get("/:id", authenticate, getAssignmentById);
export default router;
