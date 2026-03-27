// schedules.js

import { db } from '../config/db.js';
// 🔹 Create schedule
export const createSchedule = async data => {
  const { date, time } = data;

  const [result] = await db.execute(
    `INSERT INTO schedule (date, time)
     VALUES (?, ?)`,
    [date, time]
  );

  return result.insertId;
};

// 🔹 Get all schedules
export const getAllSchedules = async () => {
  const [rows] = await db.execute(`
    SELECT 
      id,
      date,
      time
    FROM schedule
    ORDER BY date, time
  `);

  return rows;
};

// 🔹 Get single schedule
export const getScheduleById = async id => {
  const [rows] = await db.execute(
    `SELECT id, date, time FROM schedule WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// 🔹 Update schedule
export const updateSchedule = async (id, data) => {
  const { date, time } = data;

  const [result] = await db.execute(
    `UPDATE schedule
     SET date = ?, time = ?
     WHERE id = ?`,
    [date, time, id]
  );

  return result.affectedRows;
};

// 🔹 Delete schedule
export const deleteSchedule = async id => {
  const [result] = await db.execute(`DELETE FROM schedule WHERE id = ?`, [id]);

  return result.affectedRows;
};

// assignment of schedules

// 🔹 Assign schedules to a member
export const assignMemberSchedules = async (memberId, scheduleIds) => {
  const values = scheduleIds.map(scheduleId => [memberId, scheduleId]);

  const [result] = await db.query(
    `INSERT INTO member_schedules (member_id, schedule_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE schedule_id = schedule_id`,
    [values]
  );

  return result;
};

// 🔹 Remove a schedule from a member
export const removeMemberSchedules = async memberId => {
  const [result] = await db.query(
    `DELETE FROM member_schedules WHERE member_id = ?`,
    [memberId]
  );
  return result.affectedRows;
};

// 🔹 Get member schedules
export const getMemberSchedules = async memberId => {
  const [rows] = await db.query(
    `SELECT s.*
     FROM member_schedules ms
     JOIN schedule s ON ms.schedule_id = s.id
     WHERE ms.member_id = ?`,
    [memberId]
  );

  return rows;
};

// assignment of coaches to schedules
// 🔹 Assign schedules to a coach
export const assignCoachSchedules = async (coachId, scheduleIds) => {
  if (!scheduleIds?.length) return;

  const values = scheduleIds.map(scheduleId => [coachId, scheduleId]);

  const [result] = await db.query(
    `INSERT INTO coach_schedules (coach_id, schedule_id)
     VALUES ?
     ON DUPLICATE KEY UPDATE schedule_id = schedule_id`,
    [values]
  );

  return result;
};
// 🔹 Get coach schedules
export const getCoachSchedules = async coachId => {
  const [rows] = await db.query(
    `SELECT s.*
     FROM coach_schedules cs
     JOIN schedule s ON cs.schedule_id = s.id
     WHERE cs.coach_id = ?`,
    [coachId]
  );

  return rows;
};
// 🔹 Remove schedule from a coach
export const removeCoachSchedule = async coachId => {
  const [result] = await db.query(
    `DELETE FROM coach_schedules WHERE coach_id = ?`,
    [coachId]
  );
  return result.affectedRows;
};
