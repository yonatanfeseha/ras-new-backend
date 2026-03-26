import express from "express";
import * as scheduleController from "../controllers/schedule.controller.js";

const router = express.Router();

// =============================
// 🔹 SCHEDULE CRUD
// =============================
router.get("/", scheduleController.getSchedules);
router.get("/:id", scheduleController.getSchedule);
router.post("/", scheduleController.createSchedule);
router.put("/:id", scheduleController.updateSchedule);
router.delete("/:id", scheduleController.deleteSchedule);


// =============================
// 🔥 MEMBER SCHEDULES
// =============================

// get all schedules for a member
router.get("/member/:memberId", scheduleController.getMemberSchedules);

// assign schedules to member
router.post("/member/assign", scheduleController.assignMemberSchedules);

// remove schedule from member
router.delete("/member/remove", scheduleController.removeMemberSchedule);


// =============================
// 🔥 COACH SCHEDULES
// =============================

// get schedules for coach
router.get("/coach/:coachId", scheduleController.getCoachSchedules);

// assign schedules to coach
router.post("/coach/assign", scheduleController.assignCoachSchedules);

// remove schedule from coach
router.delete("/coach/remove", scheduleController.removeCoachSchedule);


export default router;