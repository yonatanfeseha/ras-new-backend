import express from "express";
import * as memberController from "../controllers/member.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin"),
  memberController.getMembers,
);
router.get("/:id", authMiddleware.verifyToken, memberController.getMember);
router.put("/:id", authMiddleware.verifyToken, memberController.updateMember);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles("admin"),
  memberController.deleteMember,
);

export default router;
