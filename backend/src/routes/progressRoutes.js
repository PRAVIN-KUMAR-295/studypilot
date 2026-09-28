import express from "express";
import { getProgress } from "../controllers/progressController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getProgress);

export default router;
