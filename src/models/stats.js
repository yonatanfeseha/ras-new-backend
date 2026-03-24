import { db } from "../config/db.js";

export const getStats = async () => {
  // payment stats
  const [[totals]] = await db.query(`
    SELECT
      COUNT(*) AS totalMembers,
      SUM(payment_status = 1) AS paid,
      SUM(payment_status = 0) AS unpaid,
      SUM(payment_status = 2) AS warning
    FROM members
  `);

  // training type stats (map IDs to labels)
  const [trainingRows] = await db.query(`
    SELECT 
      CASE tt.id 
        WHEN 1 THEN 'Aerobics'
        WHEN 2 THEN 'Machine'
      END AS type,
      COUNT(mt.member_id) AS count
    FROM training_type tt
    LEFT JOIN member_training_types mt ON tt.id = mt.training_type_id
    GROUP BY tt.id
  `);

  // schedule stats (map IDs to labels)
  const [scheduleRows] = await db.query(`
    SELECT 
      CASE s.id
        WHEN 1 THEN 'MWF: Morning'
        WHEN 2 THEN 'MWF: Evening'
        WHEN 3 THEN 'TTS: Morning'
        WHEN 4 THEN 'TTS: Evening'
      END AS schedule,
      COUNT(ms.member_id) AS count
    FROM schedule s
    LEFT JOIN member_schedules ms ON s.id = ms.schedule_id
    GROUP BY s.id
  `);

  return {
    totalMembers: totals.totalMembers,
    paid: totals.paid,
    unpaid: totals.unpaid,
    warning: totals.warning,
    trainingType: trainingRows,
    schedule: scheduleRows,
  };
};
