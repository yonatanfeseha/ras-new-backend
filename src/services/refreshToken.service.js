import crypto from "crypto";
import * as refreshTokenModel from "../models/refreshToken.js";

//  hash helper
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

//  save token (login)
export const saveToken = async (userId, refreshToken, expiresAt) => {
  const tokenHash = hashToken(refreshToken);

  await refreshTokenModel.saveRefreshToken(userId, tokenHash, expiresAt);
};

//  verify token (used in refresh)
export const verifyToken = async (userId, refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  const stored = await refreshTokenModel.findRefreshToken(userId, tokenHash);

  //  CHECK 1: exists
  if (!stored) {
    throw new Error("Invalid refresh token");
  }

  // CHECK 2: expiry
  if (new Date(stored.expires_at) < new Date()) {
    throw new Error("Refresh token expired");
  }

  return stored;
};

//  delete token (logout or rotation)
export const deleteToken = async (userId, refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  await refreshTokenModel.deleteRefreshToken(userId, tokenHash);
};

// SAFE rotate token (FIXED VERSION)
export const rotateToken = async (userId, oldToken, newToken, expiresAt) => {
  const oldHash = hashToken(oldToken);
  const newHash = hashToken(newToken);

  const existing = await refreshTokenModel.findRefreshToken(userId, oldHash);

  if (!existing) {
    throw new Error("Invalid or expired refresh session");
  }

  await refreshTokenModel.updateRefreshToken(
    userId,
    oldHash,
    newHash,
    expiresAt,
  );
};
