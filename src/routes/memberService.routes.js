import express from "express";
import * as memberServiceController from "../controllers/memberService.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id/fullprofile", memberServiceController.getMemberProfile);
router.get("/:id/verify", memberServiceController.getMemberVerification);
router.post("/fullregister", memberServiceController.registerMember);
router.delete("/:id/fulldelete", memberServiceController.deleteMember);

export default router;
