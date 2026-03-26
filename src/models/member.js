// members.js

import { db } from '../config/db.js';

// Create Member
export const createMember = async member => {
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
    `INSERT INTO members 
    (name, gender, b_date, address_id, phone, url, ras_id, payment_status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, gender, b_date, address_id, phone, url, ras_id, payment_status]
  );

  return { id: result.insertId, ...member, payment_status };
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
    [name, gender, b_date, address_id, phone, url, ras_id, payment_status, id]
  );

  return result.affectedRows;
};

// Get All Members
export const getAllMembers = async () => {
  const [rows] = await db.execute(`
    SELECT m.*, a.sub_city, a.woreda
    FROM members m
    LEFT JOIN address a ON m.address_id = a.id
  `);

  return rows;
};

// Get Single Member
export const getMemberById = async id => {
  const [rows] = await db.execute(
    `
    SELECT m.*, a.sub_city, a.woreda
    FROM members m
    LEFT JOIN address a ON m.address_id = a.id
    WHERE m.id = ?
    `,
    [id]
  );

  return rows[0];
};

// Delete Member
export const deleteMember = async id => {
  const [result] = await db.execute('DELETE FROM members WHERE id = ?', [id]);
  return result.affectedRows;
};
