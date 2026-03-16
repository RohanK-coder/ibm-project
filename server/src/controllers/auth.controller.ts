import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../config/db";
import { signToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const allowedRoles = ["student", "professor", "admin"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  const existingRows = existing as any[];
  if (existingRows.length > 0) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );

  const insertResult = result as any;
  const token = signToken({
    id: insertResult.insertId,
    email,
    role
  });

  res.status(201).json({
    token,
    user: {
      id: insertResult.insertId,
      name,
      email,
      role
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [rows] = await db.query(
    "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
    [email]
  );

  const users = rows as any[];
  if (users.length === 0) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};