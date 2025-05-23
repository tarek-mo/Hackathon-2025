// middleware/isProfessor.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isProfessor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "here Unauthorized" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (decoded.role !== "professor") {
      return res
        .status(403)
        .json({ message: "Access denied: Professors only" });
    }

    // Attach user info properly
    req.user = {
      _id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.log("error", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
