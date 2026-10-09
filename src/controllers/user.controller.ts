import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const createUser = async (req: Request, res: Response) => {
  const { email, password, address, contact, fullName } = req.body;

  if (
    !email?.trim() ||
    !password?.trim() ||
    !address?.trim() ||
    !fullName?.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid user input",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      address,
      contact,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found " });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (checkPassword) {
      const secret: string | undefined = process.env.JWT_SECRET;
      if (!secret) {
        return res
          .status(500)
          .json({ success: false, message: "jwt secret missing" });
      }

      const access_token = await jwt.sign(
        { _id: user._id, role: user.role },
        secret,
        { expiresIn: "5m" },
      );
      const refresh_token = await jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        secret,
        { expiresIn: "1h" },
      );
      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
      });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      res
        .status(200)
        .json({ success: true, message: "user login successfully" });
    } else {
      return res.status(404).json({ success: false, message: "invalid user" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "server error " });
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "server error " });
  }
};
