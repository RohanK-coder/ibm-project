import { Request, Response } from "express";
import { db } from "../config/db";
import { AuthRequest } from "../middleware/auth";

export const createCourse = async (req: AuthRequest, res: Response) => {
  const { title, description, category, difficulty } = req.body;

  const [result] = await db.query(
    `INSERT INTO courses (title, description, category, difficulty, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, category, difficulty, req.user?.id]
  );

  const insertResult = result as any;

  res.status(201).json({
    message: "Course created",
    courseId: insertResult.insertId
  });
};

export const getCourses = async (_req: Request, res: Response) => {
  const [rows] = await db.query("SELECT * FROM courses ORDER BY created_at DESC");
  res.json(rows);
};

export const getCourseById = async (req: Request, res: Response) => {
  const [rows] = await db.query("SELECT * FROM courses WHERE id = ?", [req.params.id]);
  const courses = rows as any[];

  if (courses.length === 0) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(courses[0]);
};