import express from "express";
import * as emergencyController from "../controllers/emergency.controller.js";

const router = express.Router();

// =============================
// EMERGENCY CONTACT
// =============================

router.get("/:memberId", emergencyController.getEmergencyContact);
router.post("/:memberId", emergencyController.createEmergencyContact);
router.put("/:memberId", emergencyController.updateEmergencyContact);
router.delete("/:memberId", emergencyController.deleteEmergencyContact);

export default router;
