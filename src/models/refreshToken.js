import { db } from "../config/db.js";

export const saveRefreshToken = async (userId, tokenHash, expiresAt) => {
  await db.execute(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, tokenHash, expiresAt],
  );
};

export const findRefreshToken = async (userId, tokenHash) => {
  const [rows] = await db.execute(
    "SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ?",
    [userId, tokenHash],
  );
  return rows[0] ?? null;
};

export const deleteRefreshToken = async (userId, tokenHash) => {
  await db.execute(
    "DELETE FROM refresh_tokens WHERE user_id = ? AND token = ?",
    [userId, tokenHash],
  );
};

export const deleteAllUserTokens = async (userId) => {
  await db.execute("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
};

setInterval(
  async () => {
    await db.execute("DELETE FROM refresh_tokens WHERE expires_at < NOW()");
  },
  1000 * 60 * 60 * 24,
); // every 1 day
