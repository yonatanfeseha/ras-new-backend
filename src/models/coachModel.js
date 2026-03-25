import { db } from "../config/db.js";

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
