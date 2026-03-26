// emergency.js

import {db} from '../config/db.js';

// Create contact
export const createEmergencyContact = async (
  memberId,
  data,
  connection = db
) => {
  const { contact_name, phone, relationship } = data;

  const [result] = await connection.execute(
    `INSERT INTO member_emergency_contacts 
     (member_id, contact_name, phone, relationship)
     VALUES (?, ?, ?, ?)`,
    [memberId, contact_name, phone, relationship]
  );

  return {
    id: result.insertId,
    member_id: memberId,
    ...data,
  };
};

// Get contact
export const getEmergencyContact = async memberId => {
  const [rows] = await db.execute(
    'SELECT * FROM member_emergency_contacts WHERE member_id = ?',
    [memberId]
  );

  return rows[0];
};

// Update contact
export const updateEmergencyContact = async (memberId, data) => {
  const { contact_name, phone, relationship } = data;

  const [result] = await db.execute(
    `UPDATE member_emergency_contacts
     SET contact_name=?, phone=?, relationship=?
     WHERE member_id=?`,
    [contact_name, phone, relationship, memberId]
  );

  return result.affectedRows;
};

// Delete contact
export const deleteEmergencyContact = async memberId => {
  const [result] = await db.execute(
    'DELETE FROM member_emergency_contacts WHERE member_id = ?',
    [memberId]
  );
  return result.affectedRows;
};
