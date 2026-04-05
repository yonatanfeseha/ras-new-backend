import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// test
db.getConnection()
  .then(() => console.log("MySQL connected"))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
