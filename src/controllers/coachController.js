import { getAllCoaches, getCoachById } from "../models/coachModel.js";

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
