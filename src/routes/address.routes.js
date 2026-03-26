import express from 'express';
import * as addressController from '../controllers/address.controller.js';

const router = express.Router();

// =============================
// 🔹 ADDRESS CRUD
// =============================

// ⚠️ no conflict here but still keep order clean
router.get('/', addressController.getAddresses);
router.get('/:id', addressController.getAddress);
router.post('/', addressController.createAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

export default router;
