import { Response } from "express";
import { db } from "../config/db";
import { AuthRequest } from "../middleware/auth";

export const completeLesson = async (req: AuthRequest, res: Response) => {
  const { lessonId } = req.body;
  const userId = req.user?.id;

  await db.query(
    `INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
     VALUES (?, ?, true, NOW())
     ON DUPLICATE KEY UPDATE completed = true, completed_at = NOW()`,
    [userId, lessonId]
  );

  const xpToAdd = 20;

  await db.query(
    `INSERT INTO user_xp (user_id, total_xp, current_level)
     VALUES (?, ?, 1)
     ON DUPLICATE KEY UPDATE total_xp = total_xp + ?`,
    [userId, xpToAdd, xpToAdd]
  );

  const [xpRows] = await db.query(
    "SELECT total_xp FROM user_xp WHERE user_id = ?",
    [userId]
  );

  const xpData = xpRows as any[];
  const totalXp = xpData[0]?.total_xp || 0;
  const level = Math.floor(totalXp / 100) + 1;

  await db.query(
    "UPDATE user_xp SET current_level = ? WHERE user_id = ?",
    [level, userId]
  );

  res.json({
    message: "Lesson completed",
    xpEarned: xpToAdd,
    totalXp,
    level
  });
};

export const getMyProgress = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const [progressRows] = await db.query(
    `SELECT lp.lesson_id, lp.completed, lp.completed_at
     FROM lesson_progress lp
     WHERE lp.user_id = ?`,
    [userId]
  );

  const [xpRows] = await db.query(
    "SELECT total_xp, current_level FROM user_xp WHERE user_id = ?",
    [userId]
  );

  res.json({
    progress: progressRows,
    xp: (xpRows as any[])[0] || { total_xp: 0, current_level: 1 }
  });
};