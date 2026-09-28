/**
 * AWS Lambda Handler for StudyPilot AI Assistant
 * Invokes Amazon Bedrock Runtime to deliver personalized learning explanations.
 */
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const region = process.env.AWS_REGION || "us-east-1";
const modelId = process.env.BEDROCK_MODEL_ID || "anthropic.claude-3-haiku-20240307-v1:0";
const client = new BedrockRuntimeClient({ region });

export const handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : (event.body || {});
    const { question, topic, isSimpler } = body;

    if (!question || question.trim() === "") {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing required parameter: question" })
      };
    }

    const systemPrompt = `You are StudyPilot AI, an encouraging student learning mentor.
Explain concepts clearly, concisely, and with intuitive analogies.
Current topic: "${topic || "General"}".`;

    const promptText = isSimpler
      ? `Explain this simply with an intuitive analogy for a beginner student: ${question}`
      : question;

    const requestPayload = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: "user", content: promptText }]
    });

    const command = new InvokeModelCommand({
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body: Buffer.from(requestPayload)
    });

    const response = await client.send(command);
    const parsed = JSON.parse(new TextDecoder().decode(response.body));
    const answer = parsed.content?.[0]?.text || "No response received";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        answer,
        source: "bedrock",
        topic: topic || "General"
      })
    };
  } catch (error) {
    console.error("Lambda execution error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Bedrock Invocation Error",
        message: error.message
      })
    };
  }
};
