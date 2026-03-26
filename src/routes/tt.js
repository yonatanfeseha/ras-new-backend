import express from "express";
import {
  fetchTrainingTypes,
  fetchTrainingType,
  addTrainingType,
  editTrainingType,
  removeTrainingType,
} from "../controllers/tt.js";

const router = express.Router();

// 🔹 Routes
router.get("/", fetchTrainingTypes); // GET /training-types
router.get("/:id", fetchTrainingType); // GET /training-types/:id
router.post("/", addTrainingType); // POST /training-types
router.put("/:id", editTrainingType); // PUT /training-types/:id
router.delete("/:id", removeTrainingType); // DELETE /training-types/:id

export default router;
