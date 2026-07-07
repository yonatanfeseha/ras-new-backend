import { db } from "../config/db.js";

export const getDashboardStats = async () => {
  const [
    [totalMembers],
    [activeMembers],
    [expiredMembers],
    [totalCoaches],
    [totalRevenue],
    [monthlyRevenue],
    [todayRevenue],
    [todayPayments],
    [genderStats],
    [trainingStats],
    [coachStats],
  ] = await Promise.all([
    db.query(`
      SELECT COUNT(*) AS totalMembers
      FROM members
    `),

    db.query(`
      SELECT COUNT(*) AS activeMembers
      FROM members
      WHERE payment_status = 1
    `),

    db.query(`
      SELECT COUNT(*) AS expiredMembers
      FROM members
      WHERE payment_status = 0
    `),

    db.query(`
      SELECT COUNT(*) AS totalCoaches
      FROM coach
    `),

    db.query(`
      SELECT COALESCE(SUM(amount),0) AS totalRevenue
      FROM payments
    `),

    db.query(`
      SELECT COALESCE(SUM(amount),0) AS monthlyRevenue
      FROM payments
      WHERE YEAR(payment_date)=YEAR(CURDATE())
      AND MONTH(payment_date)=MONTH(CURDATE())
    `),

    db.query(`
      SELECT COALESCE(SUM(amount),0) AS todayRevenue
      FROM payments
      WHERE DATE(payment_date)=CURDATE()
    `),

    db.query(`
      SELECT COUNT(*) AS todayPayments
      FROM payments
      WHERE DATE(payment_date)=CURDATE()
    `),

    db.query(`
      SELECT
        gender,
        COUNT(*) AS total
      FROM members
      GROUP BY gender
    `),

    db.query(`
      SELECT
        t.t_type,
        COUNT(mt.member_id) AS members
      FROM training_type t
      LEFT JOIN member_training_types mt
        ON t.id = mt.training_type_id
      GROUP BY t.id
      ORDER BY members DESC
    `),

    db.query(`
      SELECT
        c.name,
        COUNT(mc.member_id) AS members
      FROM coach c
      LEFT JOIN member_coaches mc
        ON c.id = mc.coach_id
      GROUP BY c.id
      ORDER BY members DESC
    `),
  ]);

  return {
    totalMembers: totalMembers[0].totalMembers,
    activeMembers: activeMembers[0].activeMembers,
    expiredMembers: expiredMembers[0].expiredMembers,
    totalCoaches: totalCoaches[0].totalCoaches,
    totalRevenue: Number(totalRevenue[0].totalRevenue),
    monthlyRevenue: Number(monthlyRevenue[0].monthlyRevenue),
    todayRevenue: Number(todayRevenue[0].todayRevenue),
    todayPayments: todayPayments[0].todayPayments,
    genderStats,
    trainingStats,
    coachStats,
  };
};
