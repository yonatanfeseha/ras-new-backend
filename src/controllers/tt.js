import {
  getAllTrainingTypes,
  getTrainingTypeById,
  createTrainingType,
  updateTrainingType,
  deleteTrainingType,
} from "../models/tt.js";

// 🔹 GET /training-types
export const fetchTrainingTypes = async (req, res) => {
  try {
    const data = await getAllTrainingTypes();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 GET /training-types/:id
export const fetchTrainingType = async (req, res) => {
  try {
    const data = await getTrainingTypeById(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Training type not found" });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 POST /training-types
export const addTrainingType = async (req, res) => {
  try {
    const id = await createTrainingType(req.body);

    res.status(201).json({
      success: true,
      message: "Training type created",
      id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 PUT /training-types/:id
export const editTrainingType = async (req, res) => {
  try {
    const affected = await updateTrainingType(req.params.id, req.body);

    if (!affected)
      return res.status(404).json({ message: "Training type not found" });

    res.json({
      success: true,
      message: "Training type updated",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 DELETE /training-types/:id
export const removeTrainingType = async (req, res) => {
  try {
    const affected = await deleteTrainingType(req.params.id);

    if (!affected)
      return res.status(404).json({ message: "Training type not found" });

    res.json({
      success: true,
      message: "Training type deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
