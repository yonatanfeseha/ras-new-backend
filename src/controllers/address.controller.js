import * as addressModel from "../models/address.js";

// 🔹 Get all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await addressModel.getAllAddresses();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
};

// 🔹 Get single address
export const getAddress = async (req, res) => {
  try {
    const address = await addressModel.getAddressById(req.params.id);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving address" });
  }
};

// 🔹 Create address
export const createAddress = async (req, res) => {
  try {
    const { sub_city, woreda } = req.body;

    // ✅ validation
    if (!sub_city || !woreda) {
      return res.status(400).json({ error: "sub_city and woreda are required" });
    }

    const result = await addressModel.createAddress({ sub_city, woreda });

    res.status(201).json({
      message: "Address created",
      ...result,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create address" });
  }
};

// 🔹 Update address
export const updateAddress = async (req, res) => {
  try {
    const { sub_city, woreda } = req.body;

    if (!sub_city || !woreda) {
      return res.status(400).json({ error: "sub_city and woreda are required" });
    }

    // check existence (since model doesn't return affectedRows)
    const existing = await addressModel.getAddressById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Address not found" });
    }

    const updated = await addressModel.updateAddress(req.params.id, {
      sub_city,
      woreda,
    });

    res.json({
      message: "Updated successfully",
      ...updated,
    });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

// 🔹 Delete address
export const deleteAddress = async (req, res) => {
  try {
    const affected = await addressModel.deleteAddress(req.params.id);

    if (affected === 0) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};