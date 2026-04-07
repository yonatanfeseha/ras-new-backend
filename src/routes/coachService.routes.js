import express from "express";
import * as coachServiceController from "../controllers/coachService.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
router.get(
  "/:id/fullprofile",
  authMiddleware.verifyToken,
  coachServiceController.getCoachProfile,
);
router.post(
  "/fullregister",
  authMiddleware.verifyToken,
  coachServiceController.registerCoach,
);
router.delete(
  "/:id/fulldelete",
  authMiddleware.verifyToken,
  coachServiceController.deleteCoach,
);

export default router;
