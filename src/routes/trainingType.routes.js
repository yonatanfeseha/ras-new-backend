import express from "express";
import * as trainingController from "../controllers/trainingType.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// =============================
// TRAINING TYPE CRUD
// =============================
router.get(
  "/",
  authMiddleware.verifyToken,
  trainingController.getTrainingTypes,
);
router.get(
  "/:id",
  authMiddleware.verifyToken,
  trainingController.getTrainingType,
);
router.post(
  "/",
  authMiddleware.verifyToken,
  trainingController.createTrainingType,
);
router.put(
  "/:id",
  authMiddleware.verifyToken,
  trainingController.updateTrainingType,
);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  trainingController.deleteTrainingType,
);

// =============================
// MEMBER TRAINING TYPES
// =============================

// get member training types
router.get(
  "/member/:memberId",
  authMiddleware.verifyToken,
  trainingController.getMemberTrainingTypes,
);

// assign training types to member
router.post(
  "/member/assign",
  authMiddleware.verifyToken,
  trainingController.assignTrainingTypes,
);

// remove training type from member
router.delete(
  "/member/remove",
  trainingController.removeTrainingTypeFromMember,
);

// =============================
// COACH TRAINING TYPES
// =============================

// get coach training types
router.get(
  "/coach/:coachId",
  authMiddleware.verifyToken,
  trainingController.getCoachTrainingTypes,
);

// assign training types to coach
router.post(
  "/coach/assign",
  authMiddleware.verifyToken,
  trainingController.assignTrainingTypesToCoach,
);

// remove training type from coach
router.delete(
  "/coach/remove",
  authMiddleware.verifyToken,
  trainingController.removeCoachTrainingType,
);

export default router;
