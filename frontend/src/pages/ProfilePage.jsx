import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Flame,
  Award,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  Cpu
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const ProfilePage = () => {
  const { user, progress, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString([], {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    : "September 2026";

  const achievements = [
    {
      title: "Active Pilot",
      desc: "Created a student account and logged into StudyPilot",
      unlocked: true,
      icon: "🚀"
    },
    {
      title: "First Step",
      desc: "Completed at least 1 technical learning topic",
      unlocked: (progress?.topicsCompleted || 0) >= 1,
      icon: "📚"
    },
    {
      title: "Quiz Taker",
      desc: "Completed your first interactive technical quiz",
      unlocked: (progress?.quizzesCompleted || 0) >= 1,
      icon: "🎯"
    },
    {
      title: "Streak Champion",
      desc: "Maintained a continuous daily study streak",
      unlocked: (progress?.learningStreak || 0) >= 1,
      icon: "🔥"
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Profile Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-glow">
          {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {user?.name || "Student"}
              </h1>
              <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start space-x-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user?.email}</span>
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-950/20 hover:bg-rose-900/40 text-rose-300 border border-rose-900/30 text-xs font-semibold transition-colors self-center sm:self-auto"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Joined {memberSince}</span>
            </span>
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Student Session</span>
            </span>
          </div>
        </div>
      </div>

      {/* Learning Achievements Badges */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Milestones & Badges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                item.unlocked
                  ? "bg-slate-900/80 border-slate-700/80 text-white"
                  : "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60"
              }`}
            >
              <div className="text-2xl select-none">{item.icon}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  {item.unlocked && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cloud Architecture & Deployment Status Card */}
      <section className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center space-x-3 text-cyan-400">
          <Cpu className="w-5 h-5" />
          <h3 className="text-sm font-bold text-white">AWS Production Architecture Alignment</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          StudyPilot is engineered to decouple database adapters, authentication providers, and AI execution.
          In current local development mode, bcrypt with JWT authentication and local knowledge fallback are active. 
          When deployed to AWS production, Amazon Cognito, Amazon DynamoDB, and Bedrock foundational models plug into the exact same interfaces without modifying business logic.
        </p>
      </section>
    </div>
  );
};
