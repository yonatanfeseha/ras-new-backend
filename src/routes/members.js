import express from "express";
import { getMembers } from "../controllers/members.js";
import { getStatistics } from "../controllers/stats.js";
import { fetchFullMemberProfile } from "../controllers/mfull.js";

const router = express.Router();

router.get("/", getMembers);
router.get("/stats", getStatistics);
router.get("/members/:id/full-profile", fetchFullMemberProfile);

export default router;
