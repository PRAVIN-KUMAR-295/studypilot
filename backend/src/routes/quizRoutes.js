import express from "express";
import { submitQuiz, getQuizHistory } from "../controllers/quizController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Allow authenticated submissions or submissions with userId in body
router.post("/submit", (req, res, next) => {
  if (req.headers.authorization) {
    return requireAuth(req, res, next);
  }
  next();
}, submitQuiz);

router.get("/history", requireAuth, getQuizHistory);

export default router;
