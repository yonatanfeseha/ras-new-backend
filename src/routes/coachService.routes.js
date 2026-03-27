import express from "express";
import {
  getCoachProfile,
  registerCoach,
  deleteCoach,
} from "../controllers/coachService.controller.js";

const router = express.Router();

// 🔹 routes
router.get("/:id/fullprofile", getCoachProfile);
router.post("/fullregister", registerCoach);
router.delete("/:id/fulldelete", deleteCoach);

export default router;