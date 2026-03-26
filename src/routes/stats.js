// routes/stats.js
import express from "express";
import { getStatistics } from "../controllers/stats.js";

const router = express.Router();

router.get("/", getStatistics);

export default router;
