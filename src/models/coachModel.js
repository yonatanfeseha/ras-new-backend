import { db } from "../config/db.js";

// 🔹 Get all coaches with training + schedule
export const getAllCoaches = async () => {
  const [rows] = await db.query(`
    SELECT 
      c.id,
      c.name,
      c.phone,
      c.url,

      CASE ctt.training_type_id
        WHEN 1 THEN 'Aerobics'
        WHEN 2 THEN 'Machine'
      END AS training_type,

      CASE cs.schedule_id
        WHEN 1 THEN 'MWF: Morning'
        WHEN 2 THEN 'MWF: Evening'
        WHEN 3 THEN 'TTS: Morning'
        WHEN 4 THEN 'TTS: Evening'
      END AS schedule

    FROM coach c
    LEFT JOIN coach_training_types ctt ON c.id = ctt.coach_id
    LEFT JOIN coach_schedules cs ON c.id = cs.coach_id
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

      CASE ctt.training_type_id
        WHEN 1 THEN 'Aerobics'
        WHEN 2 THEN 'Machine'
      END AS training_type,

      CASE cs.schedule_id
        WHEN 1 THEN 'MWF: Morning'
        WHEN 2 THEN 'MWF: Evening'
        WHEN 3 THEN 'TTS: Morning'
        WHEN 4 THEN 'TTS: Evening'
      END AS schedule

    FROM coach c
    LEFT JOIN coach_training_types ctt ON c.id = ctt.coach_id
    LEFT JOIN coach_schedules cs ON c.id = cs.coach_id
    WHERE c.id = ?
  `,
    [id],
  );

  return coach;
};
