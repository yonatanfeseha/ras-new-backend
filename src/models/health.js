// health.js

import {db} from '../config/db.js';

// Create health
export const createHealth = async (memberId, data, connection = db) => {
  const { height, weight, issue, injury } = data;

  const [result] = await connection.execute(
    `INSERT INTO health (member_id, height, weight, issue, injury)
     VALUES (?, ?, ?, ?, ?)`,
    [memberId, height, weight, issue, injury]
  );

  return { id: result.insertId, member_id: memberId, ...data };
};

// Get health by member
export const getHealthByMember = async memberId => {
  const [rows] = await db.execute('SELECT * FROM health WHERE member_id = ?', [
    memberId,
  ]);

  return rows[0];
};

// Update health
export const updateHealth = async (memberId, data) => {
  const { height, weight, issue, injury } = data;

  const [result] = await db.execute(
    `UPDATE health 
     SET height=?, weight=?, issue=?, injury=?
     WHERE member_id=?`,
    [height, weight, issue, injury, memberId]
  );

  return result.affectedRows;
};

export const deleteHealth = async memberId => {
  const [result] = await db.execute('DELETE FROM health WHERE member_id = ?', [memberId]);
  return result.affectedRows;
};
