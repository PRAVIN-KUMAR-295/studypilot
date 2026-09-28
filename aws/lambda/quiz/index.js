/**
 * AWS Lambda Handler for Quiz Grading & Percentage Calculation
 */
export const handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : (event.body || {});
    const { score, total, subject, topic, userId } = body;

    if (typeof score !== "number" || typeof total !== "number" || total <= 0) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid score or total provided" })
      };
    }

    const percentage = Math.round((score / total) * 100);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        score,
        total,
        percentage,
        subject: subject || "General",
        topic: topic || "Practice",
        userId: userId || "anonymous",
        gradedAt: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal grading error", message: error.message })
    };
  }
};
