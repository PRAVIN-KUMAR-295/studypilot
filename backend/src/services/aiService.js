import { bedrockService } from "./bedrockService.js";
import { queryLocalKnowledge } from "./localAiKnowledge.js";

/**
 * High-level AI Service abstraction.
 * Orchestrates Amazon Bedrock queries with graceful fallback to local knowledge engine.
 */
class AIService {
  async askAI(question, topicContext = "", history = [], isSimpler = false) {
    if (!question || question.trim() === "") {
      throw new Error("Question cannot be empty");
    }

    const trimmedQuestion = question.trim();

    // 1. Attempt Bedrock if configured
    if (bedrockService.isConfigured()) {
      try {
        const enrichedPrompt = isSimpler
          ? `Please explain this in very simple, easy-to-understand student language with an intuitive analogy: "${trimmedQuestion}"`
          : trimmedQuestion;

        const bedrockAnswer = await bedrockService.generateResponse(
          enrichedPrompt,
          topicContext,
          history
        );

        if (bedrockAnswer && bedrockAnswer.trim() !== "") {
          return {
            answer: bedrockAnswer,
            source: "bedrock"
          };
        }
      } catch (err) {
        console.warn("Bedrock service error, resorting to local knowledge:", err.message);
      }
    }

    // 2. Fall back to local knowledge engine
    const localAnswer = queryLocalKnowledge(trimmedQuestion, topicContext, isSimpler);
    return {
      answer: localAnswer,
      source: "local"
    };
  }
}

export const aiService = new AIService();
