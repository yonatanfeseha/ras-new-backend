import express from "express";
import * as healthController from "../controllers/health.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/:memberId",
  authMiddleware.verifyToken,
  healthController.getHealth,
);
router.post(
  "/:memberId",
  authMiddleware.verifyToken,
  healthController.createHealth,
);
router.put(
  "/:memberId",
  authMiddleware.verifyToken,
  healthController.updateHealth,
);
router.delete(
  "/:memberId",
  authMiddleware.verifyToken,
  healthController.deleteHealth,
);

export default router;
