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

router.get(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin"),
  coachController.getCoaches,
);
router.get(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin", "coach"),
  coachController.getCoach,
);
router.put(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin", "coach"),
  coachController.updateCoach,
);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin"),
  coachController.deleteCoach,
);

// =============================
// MEMBER-COACH
// =============================

router.post(
  "/member/assign",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin"),
  coachController.assignCoaches,
);
router.delete(
  "/member/remove",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin"),
  coachController.removeCoachFromMember,
);

export default router;
