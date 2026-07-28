import express from "express";
import * as coachController from "../controllers/coach.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// COACH CRUD
router.get(
  "/member/:memberId",

  coachController.getMemberCoaches,
);

router.get("/", coachController.getCoaches);
router.get("/:id", coachController.getCoach);
router.put("/:id", coachController.updateCoach);
router.delete("/:id", coachController.deleteCoach);

// MEMBER-COACH

router.post("/member/assign", coachController.assignCoaches);
router.delete("/member/remove", coachController.removeCoachFromMember);

export default router;
