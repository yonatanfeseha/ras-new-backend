import bcrypt from "bcrypt";
import * as userModel from "../models/user.js";

export const registerUser = async ({ id, password, role }) => {
  const existingUser = await userModel.findById(id);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await userModel.createUser({
    id,
    password: hashedPassword,
    role,
  });

  return { id, role };
};

export const authenticateUser = async ({ id, password }) => {
  const user = await userModel.findById(id);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};
