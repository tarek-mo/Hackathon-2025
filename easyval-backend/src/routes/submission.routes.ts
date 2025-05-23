import express from "express";
import {
  deleteSubmission,
  getSubmissions,
  uploadSubmission,
} from "../controllers/submissionController";
import upload from "../middleware/upload";
import { authenticate } from "../middleware/auth";
import { isProfessor } from "../middleware/isProfessor";

const router = express.Router();

// Protect all submission routes with authenticate middleware
router.post("/", authenticate, upload.single("file"), uploadSubmission);
router.delete("/:id", authenticate, deleteSubmission);
router.get("/:classId", isProfessor, getSubmissions);

export default router;
