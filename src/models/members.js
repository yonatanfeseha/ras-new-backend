import db from "../config/db.js";

// Create Member
export const createMember = async (member) => {
  const {
    name,
    gender,
    b_date,
    address_id,
    phone,
    url,
    ras_id,
  } = member;

  const [result] = await db.execute(
    `INSERT INTO members 
    (name, gender, b_date, address_id, phone, url, ras_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, gender, b_date, address_id, phone, url, ras_id]
  );

  return { id: result.insertId, ...member };
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
export const getMemberById = async (id) => {
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
  } = member;

  await db.execute(
    `UPDATE members 
     SET name=?, gender=?, b_date=?, address_id=?, phone=?, url=?, ras_id=? 
     WHERE id=?`,
    [name, gender, b_date, address_id, phone, url, ras_id, id]
  );

  return { id, ...member };
};

// Delete Member
export const deleteMember = async (id) => {
  await db.execute("DELETE FROM members WHERE id = ?", [id]);
};