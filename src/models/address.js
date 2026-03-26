// address.js

import {db} from '../config/db.js';

// Create
export const createAddress = async address => {
  const { sub_city, woreda } = address;

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

  const [result] = await db.execute(
    'UPDATE address SET sub_city = ?, woreda = ? WHERE id = ?',
    [sub_city, woreda, id]
  );

  return result.affectedRows;
};

// Delete
export const deleteAddress = async id => {
  const [result] = await db.execute('DELETE FROM address WHERE id = ?', [id]);
  return result.affectedRows;
};
