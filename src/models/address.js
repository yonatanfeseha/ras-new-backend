import db from '../config/db.js';

// Create
export const createAddress = async address => {
  const { sub_city, woreda } = address;
  if (!sub_city || !woreda) {
    throw new Error('All fields are required');
  }
  const [result] = await db.execute(
    'INSERT INTO address (sub_city, woreda) VALUES (?, ?)',
    [sub_city, woreda]
  );

  return { id: result.insertId, ...address };
};

// Get all
export const getAllAddresses = async () => {
  const [rows] = await db.execute('SELECT * FROM address');
  return rows;
};

// Get one
export const getAddressById = async id => {
  const [rows] = await db.execute('SELECT * FROM address WHERE id = ?', [id]);

  return rows[0];
};

// Update
export const updateAddress = async (id, address) => {
  const { sub_city, woreda } = address;

  await db.execute('UPDATE address SET sub_city = ?, woreda = ? WHERE id = ?', [
    sub_city,
    woreda,
    id,
  ]);

  return { id, ...address };
};

// Delete
export const deleteAddress = async id => {
  await db.execute('DELETE FROM address WHERE id = ?', [id]);
};
