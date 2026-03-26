import express from "express";
import { getMembers } from "../controllers/members.js";
import { getStatistics } from "../controllers/statsController.js";
const router = express.Router();

router.get("/", getMembers);
router.get("/stats", getStatistics);

export default router;
