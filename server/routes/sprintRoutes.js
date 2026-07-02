import express from "express";

import {
  createSprint,
  getSprintsByProject,
  updateSprint,
  deleteSprint,
  startSprint,
  completeSprint,
  getActiveSprint,
} from "../controllers/sprintController.js";

const router = express.Router();

// Create Sprint
router.post("/", createSprint);

// Get Active Sprint
router.get("/active/current", getActiveSprint);

// Get Sprints by Project
router.get("/:projectId", getSprintsByProject);

// Update Sprint
router.put("/:id", updateSprint);

router.patch("/:id/start", startSprint);

router.patch("/:id/complete", completeSprint);

// Delete Sprint
router.delete("/:id", deleteSprint);



export default router;