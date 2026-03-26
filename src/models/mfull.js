import { db } from "../config/db.js";

export const getFullMemberProfile = async (memberId) => {
  // Run all queries in parallel (important for performance)
  const [
    [memberRows],
    [healthRows],
    [contactRows],
    [coachRows],
    [scheduleRows],
    [trainingTypeRows],
  ] = await Promise.all([
    // 🔹 Member
    db.query(`SELECT * FROM members WHERE id = ?`, [memberId]),

    // 🔹 Health
    db.query(`SELECT * FROM health WHERE member_id = ?`, [memberId]),

    // 🔹 Emergency Contacts
    db.query(`SELECT * FROM member_emergency_contacts WHERE member_id = ?`, [
      memberId,
    ]),

    // 🔹 Coaches
    db.query(
      `SELECT c.*
       FROM member_coaches mc
       JOIN coaches c ON mc.coach_id = c.id
       WHERE mc.member_id = ?`,
      [memberId],
    ),

    // 🔹 Schedules
    db.query(
      `SELECT s.*
       FROM member_schedules ms
       JOIN schedules s ON ms.schedule_id = s.id
       WHERE ms.member_id = ?`,
      [memberId],
    ),

    // 🔹 Training Types
    db.query(
      `SELECT t.*
       FROM member_training_types mt
       JOIN training_types t ON mt.training_type_id = t.id
       WHERE mt.member_id = ?`,
      [memberId],
    ),
  ]);

  return {
    member: memberRows[0] || null,
    health: healthRows[0] || null,
    emergencyContacts: contactRows,
    coaches: coachRows,
    schedules: scheduleRows,
    trainingTypes: trainingTypeRows,
  };
};
