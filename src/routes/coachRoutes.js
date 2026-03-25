import express from "express";
import { getCoaches, getCoach } from "../controllers/coachController.js";

const router = express.Router();

// all coaches
router.get("/", getCoaches);

// single coach
router.get("/:id", getCoach);

export default router;
