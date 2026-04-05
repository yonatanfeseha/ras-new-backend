import { db } from "../config/db.js";

export const findById = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, password, role FROM users WHERE id = ?",
    [id],
  );
  return rows[0] ?? null;
};

export const createUser = async ({ id, password, role }) => {
  await db.execute("INSERT INTO users (id, password, role) VALUES (?, ?, ?)", [
    id,
    password,
    role,
  ]);
};
