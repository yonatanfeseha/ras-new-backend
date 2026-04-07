import express from "express";
import { getStats } from "../controllers/stats.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin"),
  getStats,
);

export default router;
