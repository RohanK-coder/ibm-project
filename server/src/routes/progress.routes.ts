import { Router } from "express";
import { getMyProgress, completeLesson } from "../controllers/progress.controller";
import { protect, authorize } from "../middleware/auth";

const router = Router();

router.post("/complete-lesson", protect, authorize("student"), completeLesson);
router.get("/me", protect, authorize("student"), getMyProgress);

export default router;