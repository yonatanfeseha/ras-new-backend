import express from "express";
import { dashboardStats } from "../controllers/stats.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", dashboardStats);

export default router;
