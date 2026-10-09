import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { User } from "../types/user.types.js";
dotenv.config();

const authMiddlewares = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      success: false,
      message: "No JWT secret key",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      !("_id" in decoded) ||
      typeof decoded._id !== "string" ||
      !("role" in decoded) ||
      typeof decoded.role !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const user: User = {
      _id: decoded._id,
      role: decoded.role,
    };

    req.user = user;

    next();
  } catch (err) {
    return res.status(406).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddlewares;
