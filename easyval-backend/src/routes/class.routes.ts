// routes/class.routes.ts
import { Router } from "express";
import {
  createClass,
  updateClass,
  deleteClass,
  joinClass,
  getAllClasses,
  getClassById,
} from "../controllers/classController";
import { isProfessor } from "../middleware/isProfessor";
import { isStudent } from "../middleware/isStudent";
import { authenticate } from "../middleware/auth"; // your auth middleware

const router = Router();

router.post("/", isProfessor, createClass);
router.put("/:id", isProfessor, updateClass);
router.delete("/:id", isProfessor, deleteClass);

router.post("/join/", isStudent, joinClass);
router.get("/", authenticate, getAllClasses);

router.get("/:id", authenticate, getClassById); // 👈 Add this line

export default router;
