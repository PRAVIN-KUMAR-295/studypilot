import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SubjectsPage } from "./pages/SubjectsPage";
import { SubjectDetailsPage } from "./pages/SubjectDetailsPage";
import { TopicLearningPage } from "./pages/TopicLearningPage";
import { QuizPage } from "./pages/QuizPage";
import { QuizResultPage } from "./pages/QuizResultPage";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { ProgressPage } from "./pages/ProgressPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Protected Application Routes (Inside Main Layout with Sidebar & Navbar) */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/subjects/:id" element={<SubjectDetailsPage />} />
            <Route path="/topics/:id" element={<TopicLearningPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz/result" element={<QuizResultPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
