import express from 'express';
import * as AddressController from '../controllers/address.js';

const router = express.Router();

router.post('/', AddressController.createAddress);
router.get('/', AddressController.getAddresses);
router.get('/:id', AddressController.getAddress);
router.put('/:id', AddressController.updateAddress);
router.delete('/:id', AddressController.deleteAddress);

export default router;
