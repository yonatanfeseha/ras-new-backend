import express from "express";
import * as memberServiceController from "../controllers/memberService.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
router.get(
  "/:id/fullprofile",
  authMiddleware.verifyToken,
  memberServiceController.getMemberProfile,
);
router.post(
  "/fullregister",
  authMiddleware.verifyToken,
  memberServiceController.registerMember,
);
router.delete(
  "/:id/fulldelete",
  authMiddleware.verifyToken,
  memberServiceController.deleteMember,
);

export default router;
