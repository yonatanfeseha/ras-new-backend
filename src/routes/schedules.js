import express from "express";
import {
  fetchSchedules,
  fetchSchedule,
  addSchedule,
  editSchedule,
  removeSchedule,
} from "../controllers/schedules.js";

const router = express.Router();

// 🔹 Routes
router.get("/", fetchSchedules);
router.get("/:id", fetchSchedule);
router.post("/", addSchedule);
router.put("/:id", editSchedule);
router.delete("/:id", removeSchedule);

export default router;
