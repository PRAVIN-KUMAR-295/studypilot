import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SkeletonLoader } from "./SkeletonLoader";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 animate-spin flex items-center justify-center shadow-glow">
          <div className="w-6 h-6 rounded-xl bg-[#070B14]" />
        </div>
        <p className="text-sm font-medium text-slate-400 animate-pulse">
          Authenticating StudyPilot session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
