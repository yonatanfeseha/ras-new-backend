import express from "express";
import * as memberController from "../controllers/member.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", memberController.getMembers);
router.get("/:id", memberController.getMember);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

export default router;
