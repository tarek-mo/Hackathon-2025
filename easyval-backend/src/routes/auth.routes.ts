// routes/auth.routes.ts
import { Router } from "express";
import { signup, login, logout } from "../controllers/userController";
import { authenticate } from "../middleware/auth";
import { isProfessor } from "../middleware/isProfessor";
import { isStudent } from "../middleware/isStudent";
import { getClassById } from "../controllers/classController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/verify", authenticate, (req, res) => {
  res.json({ message: "User is authenticated", user: (req as any).user });
});

// Verify user is professor
router.get("/verify-professor", isProfessor, (req, res) => {
  res.json({ message: "User is a professor", user: (req as any).user });
});

// Verify user is student
router.get("/verify-student", isStudent, (req, res) => {
  res.json({ message: "User is a student", user: (req as any).user });
});

export default router;
