import express from "express";
import * as coachServiceController from "../controllers/coachService.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id/fullprofile", coachServiceController.getCoachProfile);
router.post("/fullregister", coachServiceController.registerCoach);
router.delete("/:id/fulldelete", coachServiceController.deleteCoach);

export default router;
