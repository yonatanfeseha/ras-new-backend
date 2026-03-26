import express from "express";
import * as ctrl from "../controllers/mNested.js";

const router = express.Router();

// 🔹 HEALTH
router.get("/:id/health", ctrl.getHealth);
router.post("/:id/health", ctrl.saveHealth);
router.put("/:id/health", ctrl.saveHealth);

// 🔹 EMERGENCY CONTACTS
router.get("/:id/emergency-contacts", ctrl.getContacts);
router.post("/:id/emergency-contacts", ctrl.addContact);
router.put("/:id/emergency-contacts/:contactId", ctrl.editContact);

// 🔹 COACHES
router.get("/:id/coaches", ctrl.getCoaches);
router.post("/:id/coaches", ctrl.assignCoachesCtrl);
router.delete("/:id/coaches/:coachId", ctrl.removeCoachCtrl);

// 🔹 SCHEDULES
router.get("/:id/schedules", ctrl.getSchedules);
router.post("/:id/schedules", ctrl.assignSchedulesCtrl);
router.delete("/:id/schedules/:scheduleId", ctrl.removeScheduleCtrl);

// 🔹 TRAINING TYPES
router.get("/:id/training-types", ctrl.getTrainingTypes);
router.post("/:id/training-types", ctrl.assignTrainingTypesCtrl);
router.delete("/:id/training-types/:typeId", ctrl.removeTrainingTypeCtrl);

export default router;
