import { Response } from "express";
import { db } from "../config/db";
import { AuthRequest } from "../middleware/auth";

export const createGroup = async (req: AuthRequest, res: Response) => {
  const { name, description } = req.body;

  const [result] = await db.query(
    `INSERT INTO course_groups (professor_id, name, description)
     VALUES (?, ?, ?)`,
    [req.user?.id, name, description]
  );

  const insertResult = result as any;

  res.status(201).json({
    message: "Group created",
    groupId: insertResult.insertId
  });
};

export const addCourseToGroup = async (req: AuthRequest, res: Response) => {
  const { groupId, courseId } = req.body;

  await db.query(
    `INSERT INTO course_group_courses (course_group_id, course_id)
     VALUES (?, ?)`,
    [groupId, courseId]
  );

  res.json({ message: "Course added to group" });
};

export const enrollStudent = async (req: AuthRequest, res: Response) => {
  const { groupId, studentId } = req.body;

  await db.query(
    `INSERT INTO enrollments (user_id, course_group_id)
     VALUES (?, ?)`,
    [studentId, groupId]
  );

  res.json({ message: "Student enrolled" });
};

export const getProfessorGroups = async (req: AuthRequest, res: Response) => {
  const [rows] = await db.query(
    "SELECT * FROM course_groups WHERE professor_id = ? ORDER BY created_at DESC",
    [req.user?.id]
  );

  res.json(rows);
};