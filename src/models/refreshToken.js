import { db } from "../config/db.js";

/**
 * Save refresh token on login
 */
export const saveRefreshToken = async (userId, tokenHash, expiresAt) => {
  await db.execute(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES (?, ?, ?)`,
    [userId, tokenHash, expiresAt]
  );
};

/**
 * Find valid refresh token
 * ⚠️ IMPORTANT: removed NOW() check to avoid timezone/expiry bugs
 */
export const findRefreshToken = async (userId, tokenHash) => {
  const [rows] = await db.execute(
    `SELECT * FROM refresh_tokens
     WHERE user_id = ? AND token = ?`,
    [userId, tokenHash]
  );

  return rows.length > 0 ? rows[0] : null;
};

/**
 * Delete single refresh token (logout)
 */
export const deleteRefreshToken = async (userId, tokenHash) => {
  await db.execute(
    `DELETE FROM refresh_tokens
     WHERE user_id = ? AND token = ?`,
    [userId, tokenHash]
  );
};

/**
 * Delete all user tokens (optional security reset)
 */
export const deleteAllUserTokens = async (userId) => {
  await db.execute(
    `DELETE FROM refresh_tokens
     WHERE user_id = ?`,
    [userId]
  );
};

/**
 * Rotate refresh token (safe update)
 */
export const updateRefreshToken = async (
  userId,
  oldTokenHash,
  newTokenHash,
  expiresAt
) => {
  await db.execute(
    `UPDATE refresh_tokens
     SET token = ?, expires_at = ?
     WHERE user_id = ? AND token = ?`,
    [newTokenHash, expiresAt, userId, oldTokenHash]
  );
};
