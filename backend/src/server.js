import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

// Allowed origins for CORS: configured via CLIENT_URL, Render subdomains, or local dev
const clientUrlEnv = process.env.CLIENT_URL || process.env.FRONTEND_URL;
const allowedOrigins = clientUrlEnv
  ? clientUrlEnv.split(",").map((o) => o.trim().replace(/\/+$/, ""))
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    // If CLIENT_URL is wildcard or origin explicitly matches
    if (
      clientUrlEnv === "*" ||
      allowedOrigins.includes("*") ||
      allowedOrigins.includes(origin)
    ) {
      return callback(null, true);
    }

    // Automatically permit any Render or AWS Amplify/App Runner deployed frontend or local dev ports
    if (
      origin.endsWith(".onrender.com") ||
      origin.endsWith(".amplifyapp.com") ||
      origin.endsWith(".amazonaws.com") ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:")
    ) {
      return callback(null, true);
    }

    // In non-production environments allow all origins
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Body parsing middleware
app.use(express.json());

// System Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "StudyPilot API Gateway",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    bedrockConfigured: Boolean(
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY
    )
  });
});

// Mount modular API routes
app.use("/api/auth", authRoutes);
app.use("/api", subjectRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);

// Error Handling & 404
app.use(notFoundHandler);
app.use(errorHandler);

// Only listen if not imported by test runner
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 StudyPilot Backend API running on http://${HOST}:${PORT}`);
    console.log(`🧠 Bedrock configured: ${Boolean(process.env.AWS_ACCESS_KEY_ID)} (Fallback: Local Engine Active)`);
  });
}

export default app;
