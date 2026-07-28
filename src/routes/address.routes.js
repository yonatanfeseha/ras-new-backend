import express from "express";
import * as addressController from "../controllers/address.controller.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/", addressController.getAddresses);
router.get("/:id", addressController.getAddress);
// router.post("/", authMiddleware.verifyToken, addressController.createAddress);
// router.put("/:id", authMiddleware.verifyToken, addressController.updateAddress);
// router.delete(
//   "/:id",
//   authMiddleware.verifyToken,
//   addressController.deleteAddress,
// );

export default router;
