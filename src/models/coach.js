import { db } from "../config/db.js";

// 🔹 Get all coaches
export const getAllCoaches = async () => {
  const [rows] = await db.query(`SELECT * FROM coach`);
  return rows;
};

// 🔹 Get single coach
export const getCoachById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM coach WHERE id = ?`, [id]);
  return rows[0];
};

// 🔹 Create coach
export const createCoach = async (data) => {
  const { name, gender, b_date, address_id, phone, url } = data;
  const [result] = await db.query(
    `INSERT INTO coach (name, gender, b_date, address_id, phone, url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, gender, b_date, address_id, phone, url]
  );
  return { id: result.insertId, ...data };
};

// 🔹 Update coach
export const updateCoach = async (id, data) => {
  const { name, gender, b_date, address_id, phone, url } = data;

  const [result] = await db.query(
    `UPDATE coach
     SET name = ?, gender = ?, b_date = ?, address_id = ?, phone = ?, url = ?
     WHERE id = ?`,
    [name, gender, b_date, address_id, phone, url, id]
  );

  return result.affectedRows;
};

// 🔹 Delete coach
export const deleteCoach = async (id) => {
  const [result] = await db.query(`DELETE FROM coach WHERE id = ?`, [id]);
  return result.affectedRows;
};

// ================= MEMBER-COACH ASSIGNMENT =================

// 🔹 Get member's coaches
export const getMemberCoaches = async (memberId) => {
  const [rows] = await db.query(
    `SELECT c.*
     FROM member_coaches mc
     JOIN coach c ON mc.coach_id = c.id
     WHERE mc.member_id = ?`,
    [memberId]
  );
  return rows;
};

// 🔹 Assign coaches to member (batch)
export const assignCoaches = async (memberId, coachIds) => {
  if (!coachIds || coachIds.length === 0) return;
  const values = coachIds.map((id) => [memberId, id]);
  const [result] = await db.query(
    `INSERT INTO member_coaches (member_id, coach_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE coach_id = coach_id`,
    [values]
  );
  return result;
};

// 🔹 Remove coach from member
export const removeCoach = async (memberId, coachId) => {
  const [result] = await db.query(
    `DELETE FROM member_coaches
     WHERE member_id = ? AND coach_id = ?`,
    [memberId, coachId]
  );
  return result.affectedRows;
};