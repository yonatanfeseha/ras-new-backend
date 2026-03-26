import * as emergencyModel from "../models/emergency.js";

// 🔹 Get emergency contact
export const getEmergencyContact = async (req, res) => {
  try {
    const contact = await emergencyModel.getEmergencyContact(
      req.params.memberId
    );

    if (!contact) {
      return res.status(404).json({ error: "Emergency contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch emergency contact" });
  }
};

// 🔹 Create emergency contact
export const createEmergencyContact = async (req, res) => {
  try {
    const { contact_name, phone, relationship } = req.body;
    const { memberId } = req.params;

    // ✅ validation
    if (!contact_name || !phone || !relationship) {
      return res.status(400).json({
        error: "contact_name, phone, and relationship are required",
      });
    }

    const result = await emergencyModel.createEmergencyContact(
      memberId,
      { contact_name, phone, relationship }
    );

    res.status(201).json({
      message: "Emergency contact created",
      ...result,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create emergency contact" });
  }
};

// 🔹 Update emergency contact
export const updateEmergencyContact = async (req, res) => {
  try {
    const { contact_name, phone, relationship } = req.body;
    const { memberId } = req.params;

    if (!contact_name || !phone || !relationship) {
      return res.status(400).json({
        error: "contact_name, phone, and relationship are required",
      });
    }

    // check existence
    const existing = await emergencyModel.getEmergencyContact(memberId);

    if (!existing) {
      return res.status(404).json({ error: "Emergency contact not found" });
    }

    const updated = await emergencyModel.updateEmergencyContact(memberId, {
      contact_name,
      phone,
      relationship,
    });

    res.json({
      message: "Updated successfully",
      ...updated,
    });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

// 🔹 Delete emergency contact
export const deleteEmergencyContact = async (req, res) => {
  try {
    const affected = await emergencyModel.deleteEmergencyContact(
      req.params.memberId
    );

    if (affected === 0) {
      return res.status(404).json({ error: "Emergency contact not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};