import * as userService from "../services/user.service.js";
import * as refreshService from "../services/refreshToken.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (user) => {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
  return token;
};
const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "90d",
    },
  );
  return token;
};

export const register = async (req, res) => {
  try {
    const { id, password, role } = req.body;

    if (!id || !password || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await userService.registerUser({ id, password, role });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await userService.authenticateUser({ id, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90);

    await refreshService.saveToken(user.id, refreshToken, expiresAt);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({
      accessToken: accessToken,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.sendStatus(401);

  try {
    // 1. verify JWT
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // 2. check DB (VERY IMPORTANT)
    await refreshService.verifyToken(decoded.id, token);

    // 3. generate new tokens (rotation)
    const newAccessToken = generateAccessToken(decoded);
    const newRefreshToken = generateRefreshToken(decoded);

    // 4. rotate in DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90);

    await refreshService.rotateToken(
      decoded.id,
      token,
      newRefreshToken,
      expiresAt,
    );

    // 5. set new cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    // 6. send new access token
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.sendStatus(403);
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const decoded = jwt.decode(token);
    await refreshService.deleteToken(decoded.id, token);
  }

  res.clearCookie("refreshToken");
  res.sendStatus(204);
};
