import { db } from "../config/db.js";

export async function findByReference(reference) {
  const [rows] = await db.execute(
    "SELECT * FROM payments WHERE transaction_reference = ?",
    [reference],
  );

  return rows[0];
}

export async function createPayment(payment) {
  const sql = `
    INSERT INTO payments (
      member_ras_id,
      provider,
      transaction_reference,
      payer_name,
      amount,
      payment_date
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(sql, [
    payment.memberRasId,
    payment.provider,
    payment.reference,
    payment.payerName,
    payment.amount,
    payment.paymentDate,
  ]);

  return result.insertId;
}

export async function getMemberPayments(memberRasId) {
  const [rows] = await db.execute(
    `SELECT *
     FROM payments
     WHERE member_ras_id = ?
     ORDER BY payment_date DESC`,
    [memberRasId],
  );

  return rows;
}
