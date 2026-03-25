import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import memberRoutes from "./routes/members.js";
import statsRoutes from "./routes/stats.js";
import coachRoutes from "./routes/coachRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/members", memberRoutes);
app.use("/stats", statsRoutes);
app.use("/coaches", coachRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

export default app;
