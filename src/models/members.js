import { db } from "../config/db.js";

export const getAllMembers = async () => {
  const [rows] = await db.query("SELECT * FROM members");
  return rows;
};
