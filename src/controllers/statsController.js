import { getStats } from "../models/stats.js";

export const getStatistics = async (req, res) => {
  try {
    const stats = await getStats();

    res.json({
      success: true,
      ...stats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
