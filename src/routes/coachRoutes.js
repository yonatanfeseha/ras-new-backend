import express from "express";
import { getCoaches, getCoach } from "../controllers/coachController.js";
import { addCoach } from "../controllers/coachController.js";

const router = express.Router();

router.post("/", addCoach);

// all coaches
router.get("/", getCoaches);

// single coach
router.get("/:id", getCoach);

export default router;
