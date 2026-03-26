import express from "express";
import { getCoaches, getCoach } from "../controllers/coaches.js";
import { addCoach } from "../controllers/coaches.js";
import { deleteCoach } from "../controllers/coaches.js";
const router = express.Router();

router.post("/", addCoach);

// all coaches
router.get("/", getCoaches);

// single coach
router.get("/:id", getCoach);
router.delete("/:id", deleteCoach);

export default router;
