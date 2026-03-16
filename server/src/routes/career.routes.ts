import { Router } from "express";
import { analyzeCareer } from "../controllers/career.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/analyze", protect, analyzeCareer);

export default router;