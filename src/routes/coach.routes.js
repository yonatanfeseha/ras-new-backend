import express from "express";
import * as coachController from "../controllers/coach.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// =============================
// COACH CRUD
// =============================

// put specific routes first
router.get(
  "/member/:memberId",
  authMiddleware.verifyToken,
  coachController.getMemberCoaches,
);

router.get("/", authMiddleware.verifyToken, coachController.getCoaches);
router.get("/:id", authMiddleware.verifyToken, coachController.getCoach);
router.put("/:id", authMiddleware.verifyToken, coachController.updateCoach);
router.delete("/:id", authMiddleware.verifyToken, coachController.deleteCoach);

// =============================
// MEMBER-COACH
// =============================

router.post(
  "/member/assign",
  authMiddleware.verifyToken,
  coachController.assignCoaches,
);
router.delete(
  "/member/remove",
  authMiddleware.verifyToken,
  coachController.removeCoachFromMember,
);

export default router;
