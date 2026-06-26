// members.js

import { db } from "../config/db.js";

// Create Member
export const createMember = async (member) => {
  const {
    name,
    gender,
    b_date,
    address_id,
    phone,
    url,
    payment_status = 0,
  } = member;

  const [result] = await db.execute(
    `INSERT INTO members
    (name, gender, b_date, address_id, phone, url, payment_status)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, gender, b_date, address_id, phone, url, payment_status],
  );

  return result.insertId;
};

export const updateRasId = async (memberId, ras_id) => {
  const [result] = await db.execute(
    `UPDATE members
     SET ras_id = ?
     WHERE id = ?`,
    [ras_id, memberId],
  );

  return result.affectedRows;
};

// Update Member
export const updateMember = async (id, member) => {
  const {
    name,
    gender,
    b_date,
    address_id,
    phone,
    url,
    ras_id,
    payment_status = 0,
  } = member;

  const [result] = await db.execute(
    `UPDATE members 
     SET name=?, gender=?, b_date=?, address_id=?, phone=?, url=?, ras_id=?, payment_status=? 
     WHERE id=?`,
    [name, gender, b_date, address_id, phone, url, ras_id, payment_status, id],
  );

  return result.affectedRows;
};

// Get All Members + Global Search
export const getAllMembers = async (page = 1, limit = 15, search = "") => {
  const offset = (page - 1) * limit;

  const searchValue = `%${search}%`;

  // 1. GET FILTERED DATA
  const [rows] = await db.execute(
    `
    SELECT 
      m.*, 
      a.sub_city, 
      a.woreda
    FROM members m
    LEFT JOIN address a ON m.address_id = a.id
    WHERE
      m.name LIKE ?
      OR m.url LIKE ?
      OR m.phone LIKE ?
      OR m.ras_id LIKE ?
      OR a.sub_city LIKE ?
      OR a.woreda LIKE ?
    ORDER BY m.id DESC
    LIMIT ? OFFSET ?
    `,
    [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      limit,
      offset,
    ],
  );

  // 2. GET TOTAL FILTERED COUNT
  const [countResult] = await db.execute(
    `
    SELECT COUNT(*) as total
    FROM members m
    LEFT JOIN address a ON m.address_id = a.id
    WHERE
      m.name LIKE ?
      OR m.phone LIKE ?
      OR m.ras_id LIKE ?
      OR m.url LIKE ?
      OR a.sub_city LIKE ?
      OR a.woreda LIKE ?
    `,
    [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
    ],
  );

  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  return {
    data: rows,
    pagination: {
      total,
      totalPages,
      page,
      limit,
    },
  };
};
// Get Single Member
export const getMemberById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT m.*, a.sub_city, a.woreda
    FROM members m
    LEFT JOIN address a ON m.address_id = a.id
    WHERE m.id = ?
    `,
    [id],
  );

  return rows[0];
};

// Delete Member
export const deleteMember = async (id) => {
  const [result] = await db.execute("DELETE FROM members WHERE id = ?", [id]);
  return result.affectedRows;
};
