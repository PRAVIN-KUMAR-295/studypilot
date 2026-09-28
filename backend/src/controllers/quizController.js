import { dbService } from "../services/dbService.js";

/**
 * Calculates accurate whole-percentage score:
 * 3/3 = 100
 * 2/3 = 67
 * 1/3 = 33
 * 0/3 = 0
 */
export const calculatePercentage = (score, total) => {
  if (total <= 0) return 0;
  return Math.round((score / total) * 100);
};

export const submitQuiz = async (req, res, next) => {
  try {
    const { subject, topic, score, total } = req.body;
    // Prefer authenticated user ID; fallback to provided userId if available
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({
        error: "Validation Error",
        message: "User ID is required to record quiz results."
      });
    }

    if (typeof score !== "number" || typeof total !== "number") {
      return res.status(400).json({
        error: "Validation Error",
        message: "Score and total must be valid numbers."
      });
    }

    if (total <= 0) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Total quiz questions must be greater than zero."
      });
    }

    if (score < 0 || score > total) {
      return res.status(400).json({
        error: "Validation Error",
        message: `Score (${score}) must be between 0 and total (${total}).`
      });
    }

    const percentage = calculatePercentage(score, total);

    const attempt = await dbService.recordQuizAttempt({
      userId,
      subject: subject || "General",
      topic: topic || "Practice",
      score,
      total,
      percentage
    });

    const updatedProgress = await dbService.getProgress(userId);

    return res.status(200).json({
      score,
      total,
      percentage,
      attemptId: attempt.id,
      createdAt: attempt.createdAt,
      progress: updatedProgress
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const history = await dbService.getQuizHistory(userId);
    return res.status(200).json({ history });
  } catch (error) {
    next(error);
  }
};
