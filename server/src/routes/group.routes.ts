import { Router } from "express";
import {
  addCourseToGroup,
  createGroup,
  enrollStudent,
  getProfessorGroups
} from "../controllers/group.controller";
import { authorize, protect } from "../middleware/auth";

const router = Router();

router.post("/", protect, authorize("professor", "admin"), createGroup);
router.get("/mine", protect, authorize("professor", "admin"), getProfessorGroups);
router.post("/add-course", protect, authorize("professor", "admin"), addCourseToGroup);
router.post("/enroll", protect, authorize("professor", "admin"), enrollStudent);

export default router;