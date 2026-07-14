import { db } from "../config/db.js";

// Get all coaches
export const getAllCoaches = async () => {
  const [rows] = await db.query(`SELECT * FROM coach`);
  return rows;
};

export const updateRasId = async (coachId, ras_id) => {
  const [result] = await db.execute(
    `UPDATE coach
     SET ras_id = ?
     WHERE id = ?`,
    [ras_id, coachId],
  );

  return result.affectedRows;
};

// Get single coach
export const getCoachById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM coach WHERE id = ?`, [id]);
  return rows[0];
};

// Create coach
export const createCoach = async (data) => {
  const { name, gender, b_date, address_id, phone, url } = data;
  const [result] = await db.query(
    `INSERT INTO coach (name, gender, b_date, address_id, phone, url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, gender, b_date, address_id, phone, url],
  );
  return result.insertId;
};

// Update coach
export const updateCoach = async (id, data) => {
  const { name, gender, b_date, address_id, phone, url } = data;

  const [result] = await db.query(
    `UPDATE coach
     SET name = ?, gender = ?, b_date = ?, address_id = ?, phone = ?, url = ?
     WHERE id = ?`,
    [name, gender, b_date, address_id, phone, url, id],
  );

  return result.affectedRows;
};

// Delete coach
export const deleteCoach = async (id) => {
  try {
    // 1. Fetch the coach's ras_id before deleting them
    const [coachRows] = await db.query(
      "SELECT ras_id FROM coach WHERE id = ?",
      [id],
    );

    if (coachRows.length > 0) {
      const rasId = coachRows[0].ras_id;

      // 2. Clear out universal payment records matching via string RAS ID
      if (rasId) {
        await db.query("DELETE FROM payments WHERE member_ras_id = ?", [rasId]);
      }

      // 3. Clear out bridging table links to members matching via integer coach_id
      await db.query("DELETE FROM member_coaches WHERE coach_id = ?", [id]);
      await db.query("DELETE FROM coach_schedules WHERE coach_id = ?", [id]);
      await db.query("DELETE FROM coache_training_types WHERE coach_id = ?", [
        id,
      ]);
    }

    // 4. Finally, safely delete the core coach row
    const [result] = await db.query("DELETE FROM coach WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("❌ Database Error inside deleteCoach model:", error.message);
    throw error;
  }
};

// ================= MEMBER-COACH ASSIGNMENT =================

// Get member's coaches
export const getMemberCoaches = async (memberId) => {
  const [rows] = await db.query(
    `SELECT c.*
     FROM member_coaches mc
     JOIN coach c ON mc.coach_id = c.id
     WHERE mc.member_id = ?`,
    [memberId],
  );
  return rows;
};

// Assign coaches to member (batch)
export const assignCoaches = async (memberId, coachIds) => {
  if (!coachIds || coachIds.length === 0) return;
  const values = coachIds.map((id) => [memberId, id]);
  const [result] = await db.query(
    `INSERT INTO member_coaches (member_id, coach_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE coach_id = coach_id`,
    [values],
  );
  return result.affectedRows;
};

// Remove coach from member
export const removeCoach = async (memberId, coachId) => {
  const [result] = await db.query(
    `DELETE FROM member_coaches
     WHERE member_id = ? AND coach_id = ?`,
    [memberId, coachId],
  );
  return result.affectedRows;
};
