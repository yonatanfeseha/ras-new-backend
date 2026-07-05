import * as memberModel from "../models/member.js";

// =============================
// MEMBER CRUD
// =============================

// Get all
export const getMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    // SEARCH TERM
    const search = req.query.search || "";

    const result = await memberModel.getAllMembers(page, limit, search);

    res.json(result);
  } catch (err) {
    console.error("GET MEMBERS ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Get one
export const getMember = async (req, res) => {
  try {
    const member = await memberModel.getMemberById(req.params.id);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(member);
  } catch {
    res.status(500).json({ error: "Error retrieving member" });
  }
};

// Update
export const updateMember = async (req, res) => {
  try {
    const existing = await memberModel.getMemberById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Member not found" });
    }

    await memberModel.updateMember(req.params.id, req.body);

    res.json({ message: "Updated successfully" });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete
export const deleteMember = async (req, res) => {
  try {
    const affected = await memberModel.deleteMember(req.params.id);

    if (affected === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Returning success true matches the standard clean response signature
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    // 🔴 CRITICAL FIX: This exposes the actual database/foreign key error to your server window
    console.error(`❌ DELETE MEMBER CRASH LOG (ID: ${req.params.id}):`, err);

    res.status(500).json({
      success: false,
      error: "Delete failed",
      message: err.message, // Optional: send the message to the frontend for easy local debugging
    });
  }
};
