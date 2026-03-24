import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
import userRoutes from "./routes/members.js";
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;
