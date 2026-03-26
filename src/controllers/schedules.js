import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../models/schedules.js";

// 🔹 GET /schedules
export const fetchSchedules = async (req, res) => {
  try {
    const data = await getAllSchedules();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 GET /schedules/:id
export const fetchSchedule = async (req, res) => {
  try {
    const data = await getScheduleById(req.params.id);

    if (!data) return res.status(404).json({ message: "Schedule not found" });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 POST /schedules
export const addSchedule = async (req, res) => {
  try {
    const id = await createSchedule(req.body);

    res.status(201).json({
      success: true,
      message: "Schedule created",
      id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 PUT /schedules/:id
export const editSchedule = async (req, res) => {
  try {
    const affected = await updateSchedule(req.params.id, req.body);

    if (!affected)
      return res.status(404).json({ message: "Schedule not found" });

    res.json({
      success: true,
      message: "Schedule updated",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 DELETE /schedules/:id
export const removeSchedule = async (req, res) => {
  try {
    const affected = await deleteSchedule(req.params.id);

    if (!affected)
      return res.status(404).json({ message: "Schedule not found" });

    res.json({
      success: true,
      message: "Schedule deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
