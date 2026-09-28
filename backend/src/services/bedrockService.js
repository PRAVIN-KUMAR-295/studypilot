import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

/**
 * Service to invoke Amazon Bedrock foundational models using AWS SDK v3.
 * Only attempts invocations when credentials are explicitly configured.
 */
class BedrockService {
  constructor() {
    this.region = process.env.AWS_REGION || "us-east-1";
    this.modelId = process.env.BEDROCK_MODEL_ID || "anthropic.claude-3-haiku-20240307-v1:0";
    this.client = null;
    this.initClient();
  }

  initClient() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (accessKeyId && secretAccessKey && accessKeyId.trim() !== "" && secretAccessKey.trim() !== "") {
      this.client = new BedrockRuntimeClient({
        region: this.region,
        credentials: {
          accessKeyId,
          secretAccessKey
        }
      });
    } else {
      this.client = null;
    }
  }

  isConfigured() {
    this.initClient();
    return Boolean(this.client);
  }

  async generateResponse(question, topicContext, conversationHistory = []) {
    if (!this.isConfigured()) {
      return null;
    }

    const systemPrompt = `You are StudyPilot AI, a friendly, encouraging, and knowledgeable student learning mentor.
Your goals:
- Explain complex computer science, cloud computing, and programming concepts clearly and accurately.
- Use intuitive real-world analogies, concise bullet points, and code snippets when helpful.
- Avoid unnecessary jargon and encourage the student to practice.
- The student is currently studying topic: "${topicContext || "General Computer Science"}".`;

    try {
      let requestBody;
      const modelId = this.modelId;

      if (modelId.startsWith("anthropic.claude-3") || modelId.startsWith("anthropic.claude-v2")) {
        const messages = [];

        // Add relevant history if provided
        if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
          for (const msg of conversationHistory.slice(-4)) {
            if (msg.role && msg.content) {
              messages.push({
                role: msg.role === "ai" ? "assistant" : "user",
                content: msg.content
              });
            }
          }
        }

        messages.push({ role: "user", content: question });

        requestBody = JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 1200,
          temperature: 0.7,
          system: systemPrompt,
          messages
        });
      } else if (modelId.startsWith("amazon.titan")) {
        requestBody = JSON.stringify({
          inputText: `${systemPrompt}\n\nStudent Question: ${question}\n\nAnswer:`,
          textGenerationConfig: {
            maxTokenCount: 1000,
            temperature: 0.7,
            topP: 0.9
          }
        });
      } else {
        // Generic fallback JSON payload for other Bedrock models
        requestBody = JSON.stringify({
          prompt: `${systemPrompt}\n\nUser: ${question}\n\nAssistant:`,
          max_tokens_to_sample: 1000
        });
      }

      const command = new InvokeModelCommand({
        modelId: this.modelId,
        contentType: "application/json",
        accept: "application/json",
        body: Buffer.from(requestBody)
      });

      const response = await this.client.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));

      let outputText = "";
      if (responseBody.content && Array.isArray(responseBody.content)) {
        outputText = responseBody.content.map((c) => c.text).join("\n");
      } else if (responseBody.results && responseBody.results[0]?.outputText) {
        outputText = responseBody.results[0].outputText;
      } else if (responseBody.completion) {
        outputText = responseBody.completion;
      } else {
        outputText = JSON.stringify(responseBody);
      }

      return outputText.trim();
    } catch (error) {
      console.warn("Bedrock invocation failed, falling back to local engine:", error.message);
      return null;
    }
  }
}

export const bedrockService = new BedrockService();
