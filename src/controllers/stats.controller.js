import { getDashboardStats } from "../models/stats.js";

export const dashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics.",
    });
  }
};
