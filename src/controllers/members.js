import { getAllMembers } from "../models/members.js";

export const getMembers = async (req, res) => {
  try {
    const users = await getAllMembers();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
