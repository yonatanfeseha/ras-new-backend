import { getAllMembers } from "../models/members.js";

export const getMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const members = await getAllMembers(page, limit);

    res.json({
      page,
      limit,
      data: members,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
