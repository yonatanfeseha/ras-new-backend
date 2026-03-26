import express from "express";
import * as memberController from "../controllers/member.controller.js";

const router = express.Router();

router.get("/", memberController.getMembers);
router.get("/:id", memberController.getMember);
router.post("/", memberController.createMember);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

export default router;