import express from "express";
import validate from "../middleware/validate.js";

import {
  generateSprint,
  saveGeneratedSprint,
  generateSubtasks,
  estimateTaskEffort,
  summarizeSprint,
} from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/generate",
  validate(["prompt", "projectId"]),
  generateSprint
);

router.post(
  "/save",
  validate(["projectId", "sprint"]),
  saveGeneratedSprint
);

router.post(
  "/subtasks",
  validate(["taskId"]),
  generateSubtasks
);

router.post(
  "/estimate",
  validate(["taskId"]),
  estimateTaskEffort
);

router.post(
  "/summary",
  validate(["sprintId"]),
  summarizeSprint
);

export default router;