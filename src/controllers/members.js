import { getUsers } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
