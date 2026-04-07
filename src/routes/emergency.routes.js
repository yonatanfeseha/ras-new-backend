import express from "express";
import * as emergencyController from "../controllers/emergency.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// =============================
// EMERGENCY CONTACT
// =============================

router.get(
  "/:memberId",
  authMiddleware.verifyToken,
  emergencyController.getEmergencyContact,
);
router.post(
  "/:memberId",
  authMiddleware.verifyToken,
  emergencyController.createEmergencyContact,
);
router.put(
  "/:memberId",
  authMiddleware.verifyToken,
  emergencyController.updateEmergencyContact,
);
router.delete(
  "/:memberId",
  authMiddleware.verifyToken,
  emergencyController.deleteEmergencyContact,
);

export default router;
