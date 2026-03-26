import { db } from "../config/db.js";

export const getAllMembers = async (page = 1, limit = 10) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  if (page < 1) page = 1;
  if (limit > 100) limit = 100;

  const offset = (page - 1) * limit;

  const [rows] = await db.query(
    "SELECT id, name, phone, ras_id, payment_status FROM members ORDER BY id LIMIT ? OFFSET ?",
    [limit, offset],
  );

  const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM members");

  return {
    data: rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

