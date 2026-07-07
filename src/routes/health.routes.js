import express from "express";
import * as healthController from "../controllers/health.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:memberId", healthController.getHealth);
router.post("/:memberId", healthController.createHealth);
router.put("/:memberId", healthController.updateHealth);
router.delete("/:memberId", healthController.deleteHealth);

export default router;
