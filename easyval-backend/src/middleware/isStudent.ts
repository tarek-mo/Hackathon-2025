// middleware/isStudent.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (decoded.role !== "student") {
      return res.status(403).json({ message: "Access denied: Students only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
