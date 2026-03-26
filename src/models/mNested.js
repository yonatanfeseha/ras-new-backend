import { db } from "../config/db.js";

// ================= HEALTH =================

// 🔹 GET health
export const getMemberHealth = async (memberId) => {
  const [rows] = await db.query(
    `SELECT h.*
     FROM health h
     JOIN members m ON h.member_id = m.id
     WHERE m.id = ?`,
    [memberId],
  );

  return rows[0];
};

// 🔹 CREATE / UPDATE health (UPSERT)
export const upsertMemberHealth = async (memberId, data) => {
  const { height, weight, issue, injury } = data;
  if (height == null || weight == null) {
    throw new Error("Height and weight are required");
  }

  const [result] = await db.query(
    `INSERT INTO health (member_id, height, weight, issue, injury)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
     height = VALUES(height),
     weight = VALUES(weight),
     issue = VALUES(issue),
     injury = VALUES(injury)`,
    [memberId, height, weight, issue, injury],
  );

  return result;
};

// ================= EMERGENCY CONTACTS =================

// 🔹 GET contacts
export const getEmergencyContacts = async (memberId) => {
  const [rows] = await db.query(
    `SELECT ec.*
     FROM member_emergency_contacts ec
     JOIN members m ON ec.member_id = m.id
     WHERE m.id = ?`,
    [memberId],
  );

  return rows;
};

// 🔹 CREATE contact
export const createEmergencyContact = async (memberId, data) => {
  const { contact_name, phone, relationship } = data;

  const [result] = await db.query(
    `INSERT INTO member_emergency_contacts 
     (member_id, contact_name, phone, relationship)
     VALUES (?, ?, ?, ?)`,
    [memberId, contact_name, phone, relationship],
  );

  return result.insertId;
};

// 🔹 UPDATE contact
export const updateEmergencyContact = async (contactId, data) => {
  const { contact_name, phone, relationship } = data;

  const [result] = await db.query(
    `UPDATE member_emergency_contacts
     SET contact_name = ?, phone = ?, relationship = ?
     WHERE id = ?`,
    [contact_name, phone, relationship, contactId],
  );

  return result.affectedRows;
};

// ================= COACHES =================

// 🔹 GET coaches
export const getMemberCoaches = async (memberId) => {
  const [rows] = await db.query(
    `SELECT c.*
     FROM member_coaches mc
     JOIN coaches c ON mc.coach_id = c.id
     WHERE mc.member_id = ?`,
    [memberId],
  );

  return rows;
};

// 🔹 ASSIGN coaches (batch safe)
export const assignCoaches = async (memberId, coachIds) => {
  if (!coachIds || coachIds.length === 0) return;

  const values = coachIds.map((id) => [memberId, id]);

  const [result] = await db.query(
    `INSERT INTO member_coaches (member_id, coach_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE coach_id = coach_id`,
    [values],
  );

  return result;
};

// 🔹 REMOVE coach
export const removeCoach = async (memberId, coachId) => {
  const [result] = await db.query(
    `DELETE FROM member_coaches
     WHERE member_id = ? AND coach_id = ?`,
    [memberId, coachId],
  );

  return result.affectedRows;
};

// ================= SCHEDULES =================

// 🔹 GET schedules
export const getMemberSchedules = async (memberId) => {
  const [rows] = await db.query(
    `SELECT s.*, t.name AS training_type_name
     FROM member_schedules ms
     JOIN schedules s ON ms.schedule_id = s.id
     LEFT JOIN training_types t ON s.training_type_id = t.id
     WHERE ms.member_id = ?`,
    [memberId],
  );

  return rows;
};

// 🔹 ASSIGN schedules
export const assignSchedules = async (memberId, scheduleIds) => {
  if (!scheduleIds || scheduleIds.length === 0) return;

  const values = scheduleIds.map((id) => [memberId, id]);

  const [result] = await db.query(
    `INSERT INTO member_schedules (member_id, schedule_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE schedule_id = schedule_id`,
    [values],
  );

  return result;
};

// 🔹 REMOVE schedule
export const removeSchedule = async (memberId, scheduleId) => {
  const [result] = await db.query(
    `DELETE FROM member_schedules
     WHERE member_id = ? AND schedule_id = ?`,
    [memberId, scheduleId],
  );

  return result.affectedRows;
};

// ================= TRAINING TYPES =================

// 🔹 GET training types
export const getMemberTrainingTypes = async (memberId) => {
  const [rows] = await db.query(
    `SELECT t.*
     FROM member_training_types mt
     JOIN training_types t ON mt.training_type_id = t.id
     WHERE mt.member_id = ?`,
    [memberId],
  );

  return rows;
};

// 🔹 ASSIGN training types
export const assignTrainingTypes = async (memberId, typeIds) => {
  if (!typeIds || typeIds.length === 0) return;

  const values = typeIds.map((id) => [memberId, id]);

  const [result] = await db.query(
    `INSERT INTO member_training_types (member_id, training_type_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE training_type_id = training_type_id`,
    [values],
  );

  return result;
};

// 🔹 REMOVE training type
export const removeTrainingType = async (memberId, typeId) => {
  const [result] = await db.query(
    `DELETE FROM member_training_types
     WHERE member_id = ? AND training_type_id = ?`,
    [memberId, typeId],
  );

  return result.affectedRows;
};
