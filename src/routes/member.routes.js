import express from "express";
import * as memberController from "../controllers/member.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware.verifyToken, memberController.getMembers);
router.get("/:id", authMiddleware.verifyToken, memberController.getMember);
router.put("/:id", authMiddleware.verifyToken, memberController.updateMember);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  memberController.deleteMember,
);

export default router;
