/**
 * AWS Lambda Handler for Student Progress Calculation
 */
export const handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : (event.body || {});
    const { userId, completedTopics = [], quizScores = [], streak = 1 } = body;

    const topicsCompleted = Array.isArray(completedTopics) ? completedTopics.length : 0;
    const quizzesCompleted = Array.isArray(quizScores) ? quizScores.length : 0;

    let averageScore = 0;
    if (quizzesCompleted > 0) {
      const sum = quizScores.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
      averageScore = Math.round(sum / quizzesCompleted);
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        userId: userId || "unknown",
        topicsCompleted,
        quizzesCompleted,
        averageScore,
        learningStreak: streak,
        calculatedAt: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Progress calculation error", message: error.message })
    };
  }
};
