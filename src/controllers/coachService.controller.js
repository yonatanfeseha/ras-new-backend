import * as coachService from "../services/coach.service.js";

// 🔹 FULL PROFILE
export const getCoachProfile = async (req, res) => {
  try {
    const profile = await coachService.getFullCoachProfile(req.params.id);

    if (!profile) {
      return res.status(404).json({ error: "Coach not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch coach profile" });
  }
};

// 🔹 FULL REGISTER
export const registerCoach = async (req, res) => {
  try {
    const result = await coachService.registerCoachFull(req.body);

    res.status(201).json({
      message: "Coach registered successfully",
      ...result,
    });
  } catch (err) {
    res.status(500).json({ error: "Coach registration failed" });
  }
};

// 🔹 FULL DELETE
export const deleteCoach = async (req, res) => {
  try {
    await coachService.deleteCoachFull(req.params.id);

    res.json({ message: "Coach deleted successfully" });
  } catch (err) {
    if (err.message === "Coach not found") {
      return res.status(404).json({ error: err.message });
    }

    res.status(500).json({ error: "Coach deletion failed" });
  }
};