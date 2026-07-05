// members.js

import { db } from "../config/db.js";

// Create Member
export const createMember = async (member) => {
  const {
    name,
    gender,
    b_date,
    address_id,
    phone,
    url,
    payment_status = 0,
  } = member;

  const [result] = await db.execute(
    `INSERT INTO members
    (name, gender, b_date, address_id, phone, url, payment_status)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, gender, b_date, address_id, phone, url, payment_status],
  );

  return result.insertId;
};

export const updateRasId = async (memberId, ras_id) => {
  const [result] = await db.execute(
    `UPDATE members
     SET ras_id = ?
     WHERE id = ?`,
    [ras_id, memberId],
  );

  return result.affectedRows;
};

export const updatePaymentStatus = async (id, status) => {
  const [result] = await db.execute(
    `UPDATE members SET payment_status=? WHERE ras_id=?`,
    [status, id],
  );

  return result.affectedRows;
};

// Update Member
export const updateMember = async (id, member) => {
  const {
    name,
    gender,
    b_date,
    address_id,
    phone,
    url,
    ras_id,
    payment_status = 0,
  } = member;

  const [result] = await db.execute(
    `UPDATE members 
     SET name=?, gender=?, b_date=?, address_id=?, phone=?, url=?, ras_id=?, payment_status=? 
     WHERE id=?`,
    [name, gender, b_date, address_id, phone, url, ras_id, payment_status, id],
  );

  return result.affectedRows;
};

// Get All Members + Global Search
export const getAllMembers = async (page = 1, limit = 15, search = "") => {
  const offset = (page - 1) * limit;

  const searchValue = `%${search}%`;

  // 1. GET FILTERED DATA
  const [rows] = await db.execute(
    `
    SELECT 
      m.*, 
      a.sub_city, 
      a.woreda
    FROM members m
    LEFT JOIN address a ON m.address_id = a.id
    WHERE
      m.name LIKE ?
      OR m.url LIKE ?
      OR m.phone LIKE ?
      OR m.ras_id LIKE ?
      OR a.sub_city LIKE ?
      OR a.woreda LIKE ?
    ORDER BY m.id DESC
    LIMIT ? OFFSET ?
    `,
    [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      limit,
      offset,
    ],
  );

  // 2. GET TOTAL FILTERED COUNT
  const [countResult] = await db.execute(
    `
    SELECT COUNT(*) as total
    FROM members m
    LEFT JOIN address a ON m.address_id = a.id
    WHERE
      m.name LIKE ?
      OR m.phone LIKE ?
      OR m.ras_id LIKE ?
      OR m.url LIKE ?
      OR a.sub_city LIKE ?
      OR a.woreda LIKE ?
    `,
    [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
    ],
  );

  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  return {
    data: rows,
    pagination: {
      total,
      totalPages,
      page,
      limit,
    },
  };
};
// Get Single Member
export const getMemberById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT m.*, a.sub_city, a.woreda
    FROM members m
    LEFT JOIN address a ON m.address_id = a.id
    WHERE m.id = ?
    `,
    [id],
  );

  return rows[0];
};

// Delete Member safely along with their child table dependencies
export const deleteMember = async (id) => {
  // 1. Get a dedicated connection from the pool for a transaction
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Fetch the ras_id for the payments cleanup
    const [memberRows] = await connection.execute(
      "SELECT ras_id FROM members WHERE id = ?",
      [id],
    );
    const rasId = memberRows[0]?.ras_id;

    // 2. Clear out child dependencies sequentially
    if (rasId) {
      await connection.execute("DELETE FROM payments WHERE member_ras_id = ?", [
        rasId,
      ]);
    }
    await connection.execute("DELETE FROM health WHERE member_id = ?", [id]);
    await connection.execute("DELETE FROM member_coaches WHERE member_id = ?", [
      id,
    ]);
    await connection.execute(
      "DELETE FROM member_emergency_contacts WHERE member_id = ?",
      [id],
    );
    await connection.execute(
      "DELETE FROM member_schedules WHERE member_id = ?",
      [id],
    );
    await connection.execute(
      "DELETE FROM member_training_types WHERE member_id = ?",
      [id],
    );

    // 3. Delete the parent profile
    const [result] = await connection.execute(
      "DELETE FROM members WHERE id = ?",
      [id],
    );

    // 4. Commit everything safely to disk
    await connection.commit();
    return result.affectedRows;
  } catch (error) {
    // If ANY of the deletes fail, undo everything so data doesn't corrupt
    await connection.rollback();
    console.error(
      "❌ Transaction failed, rolled back successfully:",
      error.message,
    );
    throw error;
  } finally {
    connection.release(); // Return connection back to the pool
  }
};

// for cron job

export const updateMembershipStatuses = async () => {
  const query = `
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
  `;

  const [result] = await db.query(query);
  return result;
};
