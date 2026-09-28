import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import { calculatePercentage } from "../src/controllers/quizController.js";
import { dbService } from "../src/services/dbService.js";
import { aiService } from "../src/services/aiService.js";
import { queryLocalKnowledge } from "../src/services/localAiKnowledge.js";

describe("StudyPilot Backend Unit & Integration Tests", () => {

  describe("Quiz Percentage Calculations (Mandatory Requirements)", () => {
    test("3/3 should calculate accurately to 100%", () => {
      const percentage = calculatePercentage(3, 3);
      assert.equal(percentage, 100);
    });

    test("2/3 should calculate accurately to 67%", () => {
      const percentage = calculatePercentage(2, 3);
      assert.equal(percentage, 67);
    });

    test("1/3 should calculate accurately to 33%", () => {
      const percentage = calculatePercentage(1, 3);
      assert.equal(percentage, 33);
    });

    test("0/3 should calculate accurately to 0%", () => {
      const percentage = calculatePercentage(0, 3);
      assert.equal(percentage, 0);
    });

    test("5/5 should calculate to 100% and 4/5 to 80%", () => {
      assert.equal(calculatePercentage(5, 5), 100);
      assert.equal(calculatePercentage(4, 5), 80);
    });

    test("Edge case: 0 total should return 0 without division-by-zero crashes", () => {
      assert.equal(calculatePercentage(0, 0), 0);
    });
  });

  describe("Authentication & Security", () => {
    const testEmail = `student_${Date.now()}@studypilot.edu`;
    const rawPassword = "SecurePassword123!";

    test("Passwords must be properly hashed with bcrypt (never plaintext)", async () => {
      const hash = await bcrypt.hash(rawPassword, 10);
      assert.notEqual(hash, rawPassword);
      assert.ok(hash.startsWith("$2a$") || hash.startsWith("$2b$"));

      const isMatch = await bcrypt.compare(rawPassword, hash);
      assert.equal(isMatch, true);

      const isWrongMatch = await bcrypt.compare("WrongPassword", hash);
      assert.equal(isWrongMatch, false);
    });

    test("Should create a new student user and assign default progress tracking", async () => {
      const hash = await bcrypt.hash(rawPassword, 10);
      const user = await dbService.createUser({
        name: "Test Pilot",
        email: testEmail,
        passwordHash: hash
      });

      assert.ok(user.id);
      assert.equal(user.email, testEmail);

      const foundUser = await dbService.findUserByEmail(testEmail);
      assert.ok(foundUser);
      assert.equal(foundUser.id, user.id);

      const progress = await dbService.getProgress(user.id);
      assert.ok(progress);
      assert.equal(progress.topicsCompleted, 0);
      assert.equal(progress.quizzesCompleted, 0);
      assert.equal(progress.learningStreak, 1);
    });
  });

  describe("Subject and Topic Retrieval", () => {
    test("Should retrieve all 4 core technical subjects", async () => {
      const subjects = await dbService.getSubjects();
      assert.equal(subjects.length, 4);

      const titles = subjects.map((s) => s.title);
      assert.ok(titles.includes("AWS Cloud"));
      assert.ok(titles.includes("Python"));
      assert.ok(titles.includes("Java"));
      assert.ok(titles.includes("Web Development"));
    });

    test("Should fetch AWS Cloud details with all 6 topics", async () => {
      const aws = await dbService.getSubjectById("aws-cloud");
      assert.ok(aws);
      assert.equal(aws.topics.length, 6);

      const topicIds = aws.topics.map((t) => t.id);
      assert.ok(topicIds.includes("cloud-computing"));
      assert.ok(topicIds.includes("ec2"));
      assert.ok(topicIds.includes("s3"));
      assert.ok(topicIds.includes("lambda"));
      assert.ok(topicIds.includes("iam"));
      assert.ok(topicIds.includes("dynamodb"));
    });

    test("Should retrieve specific topic with explanations and quiz questions", async () => {
      const topic = await dbService.getTopicById("lambda");
      assert.ok(topic);
      assert.equal(topic.title, "Lambda (Serverless Compute)");
      assert.ok(topic.explanation.length > 50);
      assert.ok(topic.keyPoints.length >= 3);
      assert.ok(topic.quiz.length >= 1);
    });
  });

  describe("Topic Completion and Progress Tracking", () => {
    test("Should mark topic as completed and increment user progress counter", async () => {
      const hash = await bcrypt.hash("pass1234", 10);
      const user = await dbService.createUser({
        name: "Progress Tester",
        email: `progress_${Date.now()}@test.com`,
        passwordHash: hash
      });

      const updatedProgress = await dbService.recordTopicCompletion(user.id, "lambda");
      assert.equal(updatedProgress.topicsCompleted, 1);
      assert.ok(updatedProgress.completedTopics.includes("lambda"));

      // Completing the same topic again should not duplicate count
      const idempotencyCheck = await dbService.recordTopicCompletion(user.id, "lambda");
      assert.equal(idempotencyCheck.topicsCompleted, 1);
    });

    test("Should record quiz attempts and calculate running average score", async () => {
      const hash = await bcrypt.hash("pass1234", 10);
      const user = await dbService.createUser({
        name: "Quiz Tester",
        email: `quiz_${Date.now()}@test.com`,
        passwordHash: hash
      });

      // First attempt: 2/3 (67%)
      await dbService.recordQuizAttempt({
        userId: user.id,
        subject: "AWS Cloud",
        topic: "Lambda",
        score: 2,
        total: 3,
        percentage: 67
      });

      // Second attempt: 3/3 (100%)
      await dbService.recordQuizAttempt({
        userId: user.id,
        subject: "AWS Cloud",
        topic: "S3",
        score: 3,
        total: 3,
        percentage: 100
      });

      const progress = await dbService.getProgress(user.id);
      assert.equal(progress.quizzesCompleted, 2);
      // Average of 67% and 100% = 83.5 -> 84%
      assert.equal(progress.averageScore, 84);

      const history = await dbService.getQuizHistory(user.id);
      assert.equal(history.length, 2);
    });
  });

  describe("AI Assistant and Local Fallback Engine", () => {
    test("Should return rich technical knowledge for AWS Lambda via local engine", async () => {
      const result = await aiService.askAI("Explain AWS Lambda", "aws-cloud");
      assert.ok(result.answer.length > 50);
      assert.equal(result.source, "local");
      assert.ok(result.answer.includes("AWS Lambda"));
    });

    test("Should return simpler analogy when requested", async () => {
      const result = await aiService.askAI("Explain Amazon S3", "aws-cloud", [], true);
      assert.ok(result.answer.includes("simpler") || result.answer.includes("Think of"));
      assert.equal(result.source, "local");
    });

    test("Should provide friendly guidance when topic is unknown", async () => {
      const response = queryLocalKnowledge("Quantum teleportation in outer space", "");
      assert.ok(response.includes("I don't have a detailed lesson for that topic yet"));
    });

    test("Should reject empty questions cleanly", async () => {
      await assert.rejects(
        async () => {
          await aiService.askAI("   ");
        },
        {
          message: "Question cannot be empty"
        }
      );
    });
  });
});
