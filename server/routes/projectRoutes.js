import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Create Project
router.post("/", createProject);

// Get All Projects
router.get("/", getProjects);

//Update Project
router.put("/:id", updateProject);
  
// Delete Project
router.delete("/:id", deleteProject);

export default router;