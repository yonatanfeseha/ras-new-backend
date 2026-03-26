import * as statsModel from "../models/stats.js";

export const getStats = async (req, res) => {
  try {
    const stats = await statsModel.getStats();
    res.json(stats);
  } catch {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};