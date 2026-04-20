import crypto from "crypto";
import * as refreshTokenModel from "../models/refreshToken.js";

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const saveToken = async (userId, refreshToken, expiresAt) => {
  const tokenHash = hashToken(refreshToken);

  await refreshTokenModel.saveRefreshToken(userId, tokenHash, expiresAt);
};

export const verifyToken = async (userId, refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  const stored = await refreshTokenModel.findRefreshToken(userId, tokenHash);

  if (!stored) {
    throw new Error("Invalid refresh token");
  }

  return stored;
};

export const deleteToken = async (userId, refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  await refreshTokenModel.deleteRefreshToken(userId, tokenHash);
};

export const rotateToken = async (userId, oldToken, newToken, expiresAt) => {
  const oldHash = hashToken(oldToken);
  const newHash = hashToken(newToken);

  await refreshTokenModel.deleteRefreshToken(userId, oldHash);

  await refreshTokenModel.saveRefreshToken(userId, newHash, expiresAt);
};
