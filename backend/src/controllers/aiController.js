import { aiService } from "../services/aiService.js";

export const askAssistant = async (req, res, next) => {
  try {
    const { question, topic, history, isSimpler } = req.body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({
        error: "Validation Error",
        message: "Please enter a valid question for StudyPilot AI."
      });
    }

    const result = await aiService.askAI(
      question.trim(),
      topic || "",
      Array.isArray(history) ? history : [],
      Boolean(isSimpler)
    );

    return res.status(200).json({
      answer: result.answer,
      source: result.source,
      topic: topic || "General"
    });
  } catch (error) {
    next(error);
  }
};
