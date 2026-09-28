/**
 * Determine API Base URL:
 * In production on Render: VITE_API_URL=https://your-backend.onrender.com
 * In development: VITE_API_URL=http://localhost:3000 (or relative /api via Vite proxy)
 */
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  if (!envUrl) return "/api";
  const clean = envUrl.replace(/\/+$/, "");
  return clean.endsWith("/api") ? clean : `${clean}/api`;
};

const API_BASE = getBaseUrl();

export const getAuthToken = () => {
  return localStorage.getItem("studypilot_token");
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("studypilot_token", token);
  } else {
    localStorage.removeItem("studypilot_token");
  }
};

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.message || data.error || `Request failed with status ${res.status}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Unable to connect to StudyPilot server. Please ensure the backend is running.");
    }
    throw error;
  }
}

export const api = {
  // Auth
  signup: (userData) => request("/auth/signup", { method: "POST", body: JSON.stringify(userData) }),
  login: (credentials) => request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  getMe: () => request("/auth/me", { method: "GET" }),

  // Subjects & Topics
  getSubjects: () => request("/subjects", { method: "GET" }),
  getSubjectById: (id) => request(`/subjects/${id}`, { method: "GET" }),
  getTopicById: (id) => request(`/topics/${id}`, { method: "GET" }),
  completeTopic: (id) => request(`/topics/${id}/complete`, { method: "POST" }),

  // Quizzes
  submitQuiz: (data) => request("/quiz/submit", { method: "POST", body: JSON.stringify(data) }),
  getQuizHistory: () => request("/quiz/history", { method: "GET" }),

  // Progress
  getProgress: () => request("/progress", { method: "GET" }),

  // AI Assistant
  askAI: (question, topic = "", history = [], isSimpler = false) =>
    request("/ai/ask", {
      method: "POST",
      body: JSON.stringify({ question, topic, history, isSimpler })
    }),

  // Health
  checkHealth: () => request("/health", { method: "GET" })
};
