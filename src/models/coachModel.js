import { db } from "../config/db.js";

// 🔹 Create coach
export const createCoach = async (coach) => {
  const { name, gender, b_date, phone, url, trainingTypes, schedules } = coach;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Insert coach
    const [result] = await conn.query(
      `INSERT INTO coach (name, gender, b_date, phone, url)
       VALUES (?, ?, ?, ?, ?)`,
      [name, gender, b_date, phone, url],
    );

    const coachId = result.insertId;

    // 2. Insert training types
    for (const typeId of trainingTypes) {
      await conn.query(
        `INSERT INTO coach_training_types (coach_id, training_type_id)
         VALUES (?, ?)`,
        [coachId, typeId],
      );
    }

    // 3. Insert schedules
    for (const scheduleId of schedules) {
      await conn.query(
        `INSERT INTO coach_schedules (coach_id, schedule_id)
         VALUES (?, ?)`,
        [coachId, scheduleId],
      );
    }

    await conn.commit();

    return coachId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// 🔹 Get all coaches with training + schedule
export const getAllCoaches = async () => {
  const [rows] = await db.query(`
    SELECT 
      c.id,
      c.name,
      c.phone,
      c.url,
      c.gender,

      GROUP_CONCAT(DISTINCT tt.t_type) AS training_type,
      GROUP_CONCAT(DISTINCT CONCAT(s.date, ': ', s.time)) AS schedule

    FROM coach c

    LEFT JOIN coach_training_types ctt 
      ON c.id = ctt.coach_id

    LEFT JOIN training_type tt 
      ON tt.id = ctt.training_type_id

    LEFT JOIN coach_schedules cs 
      ON c.id = cs.coach_id

    LEFT JOIN schedule s 
      ON s.id = cs.schedule_id


    GROUP BY c.id
  `);

  return rows;
};

// 🔹 Get single coach (details page)
export const getCoachById = async (id) => {
  const [[coach]] = await db.query(
    `
    SELECT 
      c.id,
      c.name,
      c.gender,
      c.b_date,
      c.phone,
      c.url,

      GROUP_CONCAT(DISTINCT tt.t_type) AS training_type,
      GROUP_CONCAT(DISTINCT CONCAT(s.date, ': ', s.time)) AS schedule

    FROM coach c

    LEFT JOIN coach_training_types ctt 
      ON c.id = ctt.coach_id

    LEFT JOIN training_type tt 
      ON tt.id = ctt.training_type_id

    LEFT JOIN coach_schedules cs 
      ON c.id = cs.coach_id

    LEFT JOIN schedule s 
      ON s.id = cs.schedule_id

    WHERE c.id = ?

    GROUP BY c.id
  `,
    [id],
  );

  return coach;
};
// Delete a coach by ID
export const deleteCoachById = async (id) => {
  // Delete from connecting tables first to avoid foreign key errors
  await db.query("DELETE FROM coach_training_types WHERE coach_id = ?", [id]);
  await db.query("DELETE FROM coach_schedules WHERE coach_id = ?", [id]);

  // Then delete from main coach table
  const [result] = await db.query("DELETE FROM coach WHERE id = ?", [id]);

  return result.affectedRows; // returns 1 if deleted, 0 if no coach found
};
