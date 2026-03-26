import { db } from "../config/db.js";

// 🔹 Get all schedules
export const getAllSchedules = async () => {
  const [rows] = await db.query(`
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
export const getScheduleById = async (id) => {
  const [rows] = await db.query(
    `SELECT id, date, time FROM schedules WHERE id = ?`,
    [id],
  );

  return rows[0];
};

// 🔹 Create schedule
export const createSchedule = async (data) => {
  const { date, time } = data;

  // basic validation
  if (!date || !time) {
    throw new Error("Date and time are required");
  }

  const [result] = await db.query(
    `INSERT INTO schedule (date, time)
     VALUES (?, ?)`,
    [date, time],
  );

  return result.insertId;
};

// 🔹 Update schedule
export const updateSchedule = async (id, data) => {
  const { date, time } = data;

  const [result] = await db.query(
    `UPDATE schedule
     SET date = ?, time = ?
     WHERE id = ?`,
    [date, time, id],
  );

  return result.affectedRows;
};

// 🔹 Delete schedule
export const deleteSchedule = async (id) => {
  const [result] = await db.query(`DELETE FROM schedule WHERE id = ?`, [id]);

  return result.affectedRows;
};
