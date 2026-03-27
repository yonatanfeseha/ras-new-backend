import express from "express";
import {
  getMemberProfile,
  registerMember,
  deleteMember,
} from "../controllers/memberService.controller.js";

const router = express.Router();

// 🔹 routes
router.get("/:id/fullprofile", getMemberProfile);
router.post("/fullregister", registerMember);
router.delete("/:id/fulldelete", deleteMember);

export default router;