import * as AddressModel from '../models/address.js';

// Create
export const createAddress = async (req, res) => {
  try {
    const address = await AddressModel.createAddress(req.body);
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all
export const getAddresses = async (req, res) => {
  try {
    const addresses = await AddressModel.getAllAddresses();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one
export const getAddress = async (req, res) => {
  try {
    const address = await AddressModel.getAddressById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updateAddress = async (req, res) => {
  try {
    const address = await AddressModel.updateAddress(req.params.id, req.body);

    res.json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
export const deleteAddress = async (req, res) => {
  try {
    await AddressModel.deleteAddress(req.params.id);
    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
