import express from "express";
import * as trainingController from "../controllers/trainingType.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", trainingController.getTrainingTypes);
router.get("/:id", trainingController.getTrainingType);
router.post("/", trainingController.createTrainingType);
router.put("/:id", trainingController.updateTrainingType);
router.delete("/:id", trainingController.deleteTrainingType);

// MEMBER-TRAINING TYPES

router.get("/member/:memberId", trainingController.getMemberTrainingTypes);
router.post("/member/assign", trainingController.assignTrainingTypes);
router.delete(
  "/member/remove",
  trainingController.removeTrainingTypeFromMember,
);

// COACH-TRAINING TYPES

router.get("/coach/:coachId", trainingController.getCoachTrainingTypes);
router.post("/coach/assign", trainingController.assignTrainingTypesToCoach);
router.delete("/coach/remove", trainingController.removeCoachTrainingType);

export default router;
