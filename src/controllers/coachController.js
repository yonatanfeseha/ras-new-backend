import {
  getAllCoaches,
  getCoachById,
  deleteCoachById,
} from "../models/coachModel.js";
import { createCoach } from "../models/coachModel.js";

// 🔹 POST /coaches
export const addCoach = async (req, res) => {
  try {
    const coachId = await createCoach(req.body);

    res.status(201).json({
      success: true,
      message: "Coach created successfully",
      coachId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔹 GET /coaches
export const getCoaches = async (req, res) => {
  try {
    const coaches = await getAllCoaches();

    res.json({
      success: true,
      data: coaches,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔹 GET /coaches/:id
export const getCoach = async (req, res) => {
  try {
    const { id } = req.params;

    const coach = await getCoachById(id);

    if (!coach) {
      return res.status(404).json({
        success: false,
        message: "Coach not found",
      });
    }

    res.json({
      success: true,
      data: coach,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete coach
export const deleteCoach = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteCoachById(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Coach not found" });
    }

    res.json({ success: true, message: "Coach deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
