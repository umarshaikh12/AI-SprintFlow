import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
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

router.get("/:id", getProjectById);

export default router;