import { Router } from "express";

import {
  verifyAndSavePayment,
  getPayments,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/verify", verifyAndSavePayment);
router.get("/:memberRasId", getPayments);

export default router;
