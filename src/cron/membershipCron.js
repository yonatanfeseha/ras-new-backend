import cron from "node-cron";
import db from "../config/db.js";

cron.schedule("0 0 * * *", async () => {
  try {
    await db.query(`
      UPDATE members m
      LEFT JOIN (
        SELECT
          member_ras_id,
          MAX(payment_date) AS last_payment
        FROM payments
        GROUP BY member_ras_id
      ) p
      ON m.ras_id = p.member_ras_id

      SET m.payment_status =
        CASE
          WHEN p.last_payment IS NULL THEN 0
          WHEN DATE_ADD(p.last_payment, INTERVAL 30 DAY) >= CURDATE() THEN 1
          ELSE 0
        END
    `);

    console.log("Membership statuses updated");
  } catch (err) {
    console.error(err);
  }
});
