import * as userService from "../services/user.service.js";
import * as refreshService from "../services/refreshToken.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/* =========================
   Helpers
========================= */

const cookieOptions = {
  httpOnly: true,
  secure: true, // Render / HTTPS
  sameSite: "none",
  path: "/",
};

const clearCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "90d",
    },
  );
};

/* =========================
   Register
========================= */

export const register = async (req, res) => {
  try {
    const { id, password, role } = req.body;

    if (!id || !password || !role) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    const user = await userService.registerUser({
      id,
      password,
      role,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

/* =========================
   Login
========================= */

export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await userService.authenticateUser({
      id,
      password,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90);

    await refreshService.saveToken(user.id, refreshToken, expiresAt);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.json({
      accessToken,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   Refresh
========================= */

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    // verify JWT
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // verify token in DB
    await refreshService.verifyToken(decoded.id, token);

    // generate new tokens
    const newAccessToken = generateAccessToken(decoded);

    const newRefreshToken = generateRefreshToken(decoded);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90);

    // rotate token in DB
    await refreshService.rotateToken(
      decoded.id,
      token,
      newRefreshToken,
      expiresAt,
    );

    // send fresh cookie
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    return res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    // invalid / stale token -> clear cookie
    res.clearCookie("refreshToken", clearCookieOptions);

    return res.sendStatus(403);
  }
};

/* =========================
   Logout
========================= */

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      try {
        const decoded = jwt.decode(token);

        if (decoded?.id) {
          await refreshService.deleteToken(decoded.id, token);
        }
      } catch (error) {
        // ignore decode errors
      }
    }

    res.clearCookie("refreshToken", clearCookieOptions);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
