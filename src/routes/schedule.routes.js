import express from "express";
import * as scheduleController from "../controllers/schedule.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// =============================
// SCHEDULE CRUD
// =============================
router.get("/", authMiddleware.verifyToken, scheduleController.getSchedules);
router.get("/:id", authMiddleware.verifyToken, scheduleController.getSchedule);
router.post("/", authMiddleware.verifyToken, scheduleController.createSchedule);
router.put(
  "/:id",
  authMiddleware.verifyToken,
  scheduleController.updateSchedule,
);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  scheduleController.deleteSchedule,
);

// =============================
// MEMBER SCHEDULES
// =============================

// get all schedules for a member
router.get(
  "/member/:memberId",
  authMiddleware.verifyToken,
  scheduleController.getMemberSchedules,
);

// assign schedules to member
router.post(
  "/member/assign",
  authMiddleware.verifyToken,
  scheduleController.assignMemberSchedules,
);

// remove schedule from member
router.delete(
  "/member/remove",
  authMiddleware.verifyToken,
  scheduleController.removeMemberSchedule,
);

// =============================
// COACH SCHEDULES
// =============================

// get schedules for coach
router.get(
  "/coach/:coachId",
  authMiddleware.verifyToken,
  scheduleController.getCoachSchedules,
);

// assign schedules to coach
router.post(
  "/coach/assign",
  authMiddleware.verifyToken,
  scheduleController.assignCoachSchedules,
);

// remove schedule from coach
router.delete(
  "/coach/remove",
  authMiddleware.verifyToken,
  scheduleController.removeCoachSchedule,
);

export default router;
