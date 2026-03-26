import * as coachModel from "../models/coach.js";

// =============================
// 🔹 COACH CRUD
// =============================

// 🔹 Get all coaches
export const getCoaches = async (req, res) => {
  try {
    const coaches = await coachModel.getAllCoaches();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coaches" });
  }
};

// 🔹 Get single coach
export const getCoach = async (req, res) => {
  try {
    const coach = await coachModel.getCoachById(req.params.id);

    if (!coach) {
      return res.status(404).json({ error: "Coach not found" });
    }

    res.json(coach);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving coach" });
  }
};

// 🔹 Create coach
export const createCoach = async (req, res) => {
  try {
    const { name, gender, b_date, address_id, phone, url } = req.body;

    // ✅ validation
    if (!name || !gender || !b_date) {
      return res.status(400).json({
        error: "name, gender, and b_date are required",
      });
    }

    // optional validation (basic)
    if (!["male", "female"].includes(gender.toLowerCase())) {
      return res.status(400).json({ error: "Gender must be male or female" });
    }

    const result = await coachModel.createCoach({
      name,
      gender,
      b_date,
      address_id,
      phone,
      url,
    });

    res.status(201).json({
      message: "Coach created",
      ...result,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create coach" });
  }
};

// 🔹 Update coach
export const updateCoach = async (req, res) => {
  try {
    const { name, gender, b_date, address_id, phone, url } = req.body;

    if (!name || !gender || !b_date) {
      return res.status(400).json({
        error: "name, gender, and b_date are required",
      });
    }

    // check existence
    const existing = await coachModel.getCoachById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Coach not found" });
    }

    const updated = await coachModel.updateCoach(req.params.id, {
      name,
      gender,
      b_date,
      address_id,
      phone,
      url,
    });

    res.json({
      message: "Updated successfully",
      ...updated,
    });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

// 🔹 Delete coach
export const deleteCoach = async (req, res) => {
  try {
    const affected = await coachModel.deleteCoach(req.params.id);

    if (affected === 0) {
      return res.status(404).json({ error: "Coach not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};


// =============================
// 🔥 MEMBER-COACH RELATION
// =============================

// 🔹 Get member coaches
export const getMemberCoaches = async (req, res) => {
  try {
    const coaches = await coachModel.getMemberCoaches(req.params.memberId);
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch member coaches" });
  }
};

// 🔹 Assign coaches to member
export const assignCoaches = async (req, res) => {
  try {
    const { memberId, coachIds } = req.body;

    if (!memberId || !coachIds?.length) {
      return res.status(400).json({
        error: "memberId and coachIds are required",
      });
    }

    await coachModel.assignCoaches(memberId, coachIds);

    res.json({ message: "Coaches assigned to member" });
  } catch (error) {
    res.status(500).json({ error: "Assignment failed" });
  }
};

// 🔹 Remove coach from member
export const removeCoachFromMember = async (req, res) => {
  try {
    const { memberId, coachId } = req.body;

    const affected = await coachModel.removeCoach(memberId, coachId);

    if (affected === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json({ message: "Removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Remove failed" });
  }
};