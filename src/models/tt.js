import { db } from "../config/db.js";

// 🔹 Get all training types
export const getAllTrainingTypes = async () => {
  const [rows] = await db.query(`
    SELECT id, t_type
    FROM training_type
    ORDER BY t_type
  `);

  return rows;
};

// 🔹 Get single training type
export const getTrainingTypeById = async (id) => {
  const [rows] = await db.query(
    `SELECT id, t_type FROM training_types WHERE id = ?`,
    [id],
  );

  return rows[0];
};

// 🔹 Create training type
export const createTrainingType = async (data) => {
  const { t_type } = data;

  if (!t_type) {
    throw new Error("Training type is required");
  }

  const [result] = await db.query(
    `INSERT INTO training_type (t_type)
     VALUES (?)`,
    [t_type],
  );

  return result.insertId;
};

// 🔹 Update training type
export const updateTrainingType = async (id, data) => {
  const { t_type } = data;

  if (!t_type) {
    throw new Error("Training type is required");
  }

  const [result] = await db.query(
    `UPDATE training_type
     SET t_type = ?
     WHERE id = ?`,
    [t_type, id],
  );

  return result.affectedRows;
};

// 🔹 Delete training type
export const deleteTrainingType = async (id) => {
  const [result] = await db.query(`DELETE FROM training_types WHERE id = ?`, [
    id,
  ]);

  return result.affectedRows;
};
