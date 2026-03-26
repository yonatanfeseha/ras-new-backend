import * as healthModel from "../models/health.js";

// 🔹 Get health
export const getHealth = async (req, res) => {
  try {
    const health = await healthModel.getHealthByMember(req.params.memberId);

    if (!health) {
      return res.status(404).json({ error: "Health record not found" });
    }

    res.json(health);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch health" });
  }
};

// 🔹 Create
export const createHealth = async (req, res) => {
  try {
    const { height, weight, issue, injury } = req.body;
    const { memberId } = req.params;

    if (!height || !weight) {
      return res.status(400).json({ error: "height and weight required" });
    }

    const result = await healthModel.createHealth(memberId, {
      height,
      weight,
      issue,
      injury,
    });

    res.status(201).json({ message: "Health created", ...result });
  } catch (error) {
    res.status(500).json({ error: "Create failed" });
  }
};

// 🔹 Update
export const updateHealth = async (req, res) => {
  try {
    const { memberId } = req.params;

    const existing = await healthModel.getHealthByMember(memberId);
    if (!existing) {
      return res.status(404).json({ error: "Health not found" });
    }

    await healthModel.updateHealth(memberId, req.body);

    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

// 🔹 Delete
export const deleteHealth = async (req, res) => {
  try {
    const affected = await healthModel.deleteHealth(req.params.memberId);

    if (affected === 0) {
      return res.status(404).json({ error: "Health not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};