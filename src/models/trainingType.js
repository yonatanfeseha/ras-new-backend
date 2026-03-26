import { db } from '../config/db.js';

// 🔹 CRUD Training Types
export const getAllTrainingTypes = async () => {
  const [rows] = await db.query(`SELECT * FROM training_type ORDER BY t_type`);
  return rows;
};

export const getTrainingTypeById = async id => {
  const [rows] = await db.query(`SELECT * FROM training_type WHERE id = ?`, [
    id,
  ]);
  return rows[0];
};

export const createTrainingType = async data => {
  const { t_type } = data;
  const [result] = await db.query(
    `INSERT INTO training_type (t_type) VALUES (?)`,
    [t_type]
  );
  return { id: result.insertId, t_type };
};

export const updateTrainingType = async (id, data) => {
  const { t_type } = data;
  await db.query(`UPDATE training_type SET t_type = ? WHERE id = ?`, [
    t_type,
    id,
  ]);
  return { id, t_type };
};

export const deleteTrainingType = async id => {
  const [result] = await db.query(`DELETE FROM training_type WHERE id = ?`, [
    id,
  ]);
  return result.affectedRows;
};

// ================= MEMBER-TRAINING TYPE =================

// 🔹 Get member training types
export const getMemberTrainingTypes = async memberId => {
  const [rows] = await db.query(
    `SELECT t.*
     FROM member_training_types mt
     JOIN training_type t ON mt.training_type_id = t.id
     WHERE mt.member_id = ?`,
    [memberId]
  );
  return rows;
};

// 🔹 Assign training types to member
export const assignTrainingTypes = async (memberId, typeIds) => {
  if (!typeIds || typeIds.length === 0) return;
  const values = typeIds.map(id => [memberId, id]);
  const [result] = await db.query(
    `INSERT INTO member_training_types (member_id, training_type_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE training_type_id = training_type_id`,
    [values]
  );
  return result;
};

// 🔹 Remove training type from member
export const removeTrainingType = async (memberId, typeId) => {
  const [result] = await db.query(
    `DELETE FROM member_training_types
     WHERE member_id = ? AND training_type_id = ?`,
    [memberId, typeId]
  );
  return result.affectedRows;
};

// ================= coach-TRAINING TYPE =================
// 🔹 Get training types for a coach
export const getCoachTrainingTypes = async coachId => {
  const [rows] = await db.query(
    `SELECT t.*
     FROM coach_training_types ct
     JOIN training_type t ON ct.training_type_id = t.id
     WHERE ct.coach_id = ?`,
    [coachId]
  );
  return rows;
};

// 🔹 Assign training types to a coach (batch)
export const assignTrainingTypesToCoach = async (coachId, typeIds) => {
  if (!typeIds?.length) return;
  const values = typeIds.map(id => [coachId, id]);
  const [result] = await db.query(
    `INSERT INTO coach_training_types (coach_id, training_type_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE training_type_id = training_type_id`,
    [values]
  );
  return result;
};

// 🔹 Remove a training type from a coach
export const removeCoachTrainingType = async (coachId, typeId) => {
  const [result] = await db.query(
    `DELETE FROM coach_training_types
     WHERE coach_id = ? AND training_type_id = ?`,
    [coachId, typeId]
  );
  return result.affectedRows;
};
