import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import { seedSubjects, seedSubjectQuizzes } from "../data/seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORAGE_DIR = process.env.STORAGE_DIR || path.join(__dirname, "../../data/storage");
const DB_FILE = path.join(STORAGE_DIR, "studypilot_db.json");

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

class DbService {
  constructor() {
    this.data = {
      users: [],
      progress: {},
      quizAttempts: [],
      subjects: seedSubjects,
      subjectQuizzes: seedSubjectQuizzes
    };
    this.loadDatabase();
  }

  loadDatabase() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        this.data.users = parsed.users || [];
        this.data.progress = parsed.progress || {};
        this.data.quizAttempts = parsed.quizAttempts || [];
        // Keep seed subjects up to date with rich content
        this.data.subjects = seedSubjects;
        this.data.subjectQuizzes = seedSubjectQuizzes;
      } else {
        this.seedDemoUser();
        this.saveDatabase();
      }

      if (!this.data.users.some((u) => u.email === "student@studypilot.edu")) {
        this.seedDemoUser();
        this.saveDatabase();
      }
    } catch (err) {
      console.error("Error reading database file, using in-memory state:", err.message);
      this.seedDemoUser();
    }
  }

  seedDemoUser() {
    // Pre-seed demo student for instant evaluation
    const demoPasswordHash = "$2a$10$WpA17Zk.FvH0g1kYtMhQ..eJ3k0bA76uWv/v/K629rO0dYyFfJ31W"; // bcrypt for "studypilot123"
    const demoUser = {
      id: "usr_demo_student",
      name: "Alex Morgan",
      email: "student@studypilot.edu",
      passwordHash: "$2a$10$iQvF6f7K6d98Y3m0wQp1OeXqR2vQkC/oJ2vF8f9Y0z1A2B3C4D5E6", // we will compute live hash or bcrypt sync
      createdAt: new Date().toISOString()
    };
    // Ensure valid bcrypt hash
    demoUser.passwordHash = bcrypt.hashSync("studypilot123", 10);
    this.data.users.push(demoUser);
    this.data.progress[demoUser.id] = {
      userId: demoUser.id,
      topicsCompleted: 2,
      quizzesCompleted: 1,
      averageScore: 100,
      learningStreak: 3,
      completedTopics: ["cloud-computing", "python-basics"],
      lastActiveDate: new Date().toISOString().split("T")[0]
    };
    this.data.quizAttempts.push({
      id: "qa_demo_01",
      userId: demoUser.id,
      subject: "AWS Cloud",
      topic: "Cloud Computing",
      score: 2,
      total: 2,
      percentage: 100,
      createdAt: new Date().toISOString()
    });
  }

  saveDatabase() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to persist database to file:", err.message);
    }
  }

  // User Model Operations
  async findUserByEmail(email) {
    if (!email) return null;
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findUserById(id) {
    return this.data.users.find((u) => u.id === id) || null;
  }

  async createUser({ name, email, passwordHash }) {
    const user = {
      id: "usr_" + crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(user);

    // Initialize default progress for new user
    this.data.progress[user.id] = {
      userId: user.id,
      topicsCompleted: 0,
      quizzesCompleted: 0,
      averageScore: 0,
      learningStreak: 1,
      completedTopics: [],
      lastActiveDate: new Date().toISOString().split("T")[0]
    };

    this.saveDatabase();
    return user;
  }

  // Subject and Topic Operations
  async getSubjects() {
    return this.data.subjects.map((s) => ({
      id: s.id,
      title: s.title,
      icon: s.icon,
      tagline: s.tagline,
      category: s.category,
      level: s.level,
      topicsCount: s.topics.length,
      color: s.color
    }));
  }

  async getSubjectById(subjectId) {
    const subject = this.data.subjects.find((s) => s.id === subjectId);
    if (!subject) return null;
    return {
      ...subject,
      quizzes: this.data.subjectQuizzes[subjectId] || []
    };
  }

  async getTopicById(topicId) {
    for (const subject of this.data.subjects) {
      const topic = subject.topics.find((t) => t.id === topicId);
      if (topic) {
        return {
          ...topic,
          subjectTitle: subject.title
        };
      }
    }
    return null;
  }

  // Progress Operations
  async getProgress(userId) {
    let p = this.data.progress[userId];
    if (!p) {
      p = {
        userId,
        topicsCompleted: 0,
        quizzesCompleted: 0,
        averageScore: 0,
        learningStreak: 1,
        completedTopics: [],
        lastActiveDate: new Date().toISOString().split("T")[0]
      };
      this.data.progress[userId] = p;
      this.saveDatabase();
    }

    // Refresh streak based on current date
    this.updateStreak(userId);
    return this.data.progress[userId];
  }

  updateStreak(userId) {
    const p = this.data.progress[userId];
    if (!p) return;

    const today = new Date().toISOString().split("T")[0];
    const lastActive = p.lastActiveDate;

    if (lastActive === today) {
      // Already active today
      return;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    if (lastActive === yesterday) {
      p.learningStreak += 1;
      p.lastActiveDate = today;
    } else {
      // Streak broken, reset to 1 today
      p.learningStreak = 1;
      p.lastActiveDate = today;
    }
    this.saveDatabase();
  }

  async recordTopicCompletion(userId, topicId) {
    const p = await this.getProgress(userId);
    if (!p.completedTopics.includes(topicId)) {
      p.completedTopics.push(topicId);
      p.topicsCompleted = p.completedTopics.length;
      this.updateStreak(userId);
      this.saveDatabase();
    }
    return p;
  }

  // Quiz Operations
  async recordQuizAttempt({ userId, subject, topic, score, total, percentage }) {
    const attempt = {
      id: "qa_" + crypto.randomUUID(),
      userId,
      subject,
      topic,
      score,
      total,
      percentage,
      createdAt: new Date().toISOString()
    };

    this.data.quizAttempts.unshift(attempt);

    // Update aggregated progress
    const p = await this.getProgress(userId);
    const userAttempts = this.data.quizAttempts.filter((a) => a.userId === userId);
    p.quizzesCompleted = userAttempts.length;

    const totalPercentageSum = userAttempts.reduce((acc, curr) => acc + curr.percentage, 0);
    p.averageScore = userAttempts.length > 0 ? Math.round(totalPercentageSum / userAttempts.length) : 0;

    this.updateStreak(userId);
    this.saveDatabase();

    return attempt;
  }

  async getQuizHistory(userId) {
    return this.data.quizAttempts.filter((a) => a.userId === userId);
  }
}

export const dbService = new DbService();
