import { Router } from "express";
import {
  createCourse,
  getCourseById,
  getCourses
} from "../controllers/course.controller";
import { authorize, protect } from "../middleware/auth";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", protect, authorize("professor", "admin"), createCourse);

export default router;