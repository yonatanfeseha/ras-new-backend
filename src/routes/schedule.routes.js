import express from "express";
import * as scheduleController from "../controllers/schedule.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// SCHEDULE CRUD
router.get("/", scheduleController.getSchedules);
router.get("/:id", scheduleController.getSchedule);
router.post("/", scheduleController.createSchedule);
router.put("/:id", scheduleController.updateSchedule);
router.delete("/:id", scheduleController.deleteSchedule);

// MEMBER-SCHEDULES

router.get("/member/:memberId", scheduleController.getMemberSchedules);
router.post("/member/assign", scheduleController.assignMemberSchedules);
router.delete("/member/remove", scheduleController.removeMemberSchedule);

// COACH-SCHEDULES

router.get("/coach/:coachId", scheduleController.getCoachSchedules);
router.post("/coach/assign", scheduleController.assignCoachSchedules);
router.delete("/coach/remove", scheduleController.removeCoachSchedule);

export default router;
