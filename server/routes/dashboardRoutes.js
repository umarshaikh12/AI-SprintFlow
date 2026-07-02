import express from "express";

import {
  getDashboardStats,
  getRecentProjects,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardStats);
router.get("/recent-projects", getRecentProjects);

export default router;