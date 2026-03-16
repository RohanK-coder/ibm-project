import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import groupRoutes from "./routes/group.routes";
import careerRoutes from "./routes/career.routes";
import progressRoutes from "./routes/progress.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "PathForge backend running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/progress", progressRoutes);

app.use(errorHandler);

export default app;