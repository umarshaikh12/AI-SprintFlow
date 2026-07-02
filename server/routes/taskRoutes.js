import express from "express";

import {
  createTask,
  getAllTasks,
  getTasksByProject,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Create Task
router.post("/", createTask);

// Get All Tasks
router.get("/", getAllTasks);

// Get Tasks by Project
router.get("/:projectId", getTasksByProject);

// Update Task
router.put("/:id", updateTask);

// Update Task Status
router.patch("/:id/status", updateTaskStatus);

// Delete Task
router.delete("/:id", deleteTask);

export default router;