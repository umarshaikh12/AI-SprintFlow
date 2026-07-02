import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import validate from "../middleware/validate.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  validate(["name", "email", "password"]),
  registerUser
);

router.post(
  "/login",
  validate(["email", "password"]),
  loginUser
);

// Protected Routes
router.put("/profile", authMiddleware, updateProfile);
router.put("/password", authMiddleware, changePassword);

export default router;