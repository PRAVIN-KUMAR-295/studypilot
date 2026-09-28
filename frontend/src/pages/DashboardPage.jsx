import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Award,
  TrendingUp,
  Flame,
  ArrowRight,
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Play
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { StatCard } from "../components/StatCard";
import { SubjectCard } from "../components/SubjectCard";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { RobotIllustration } from "../components/RobotIllustration";

export const DashboardPage = () => {
  const { user, progress, refreshProgress } = useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickQuestion, setQuickQuestion] = useState("");
  const [submittingAI, setSubmittingAI] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [subRes] = await Promise.all([
          api.getSubjects(),
          refreshProgress()
        ]);
        setSubjects(subRes.subjects || []);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleQuickAsk = (e) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    navigate("/ai-assistant", { state: { initialQuestion: quickQuestion.trim() } });
  };

  const completedList = progress?.completedTopics || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0E1A38] to-slate-900 p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personalized Learning Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Welcome back, <span className="text-gradient-cyan">{user?.name || "Student"}</span>!
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Continue your masterclass in Cloud, Programming, and Web Engineering. Keep your streak alive today!
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
            <RobotIllustration className="w-16 h-16 shrink-0" mood="happy" />
            <div className="text-left pr-2">
              <span className="text-xs font-bold text-white block">StudyPilot AI Mentor</span>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Ready to answer questions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Topics Completed"
          value={progress?.topicsCompleted ?? 0}
          unit="topics"
          subtitle="Keep learning every day"
          icon={CheckCircle2}
          color="cyan"
        />
        <StatCard
          title="Quizzes Completed"
          value={progress?.quizzesCompleted ?? 0}
          unit="quizzes"
          subtitle="Test accuracy verified"
          icon={Award}
          color="emerald"
        />
        <StatCard
          title="Average Score"
          value={progress?.averageScore ?? 0}
          unit="%"
          subtitle="Across all quiz attempts"
          icon={TrendingUp}
          color="indigo"
        />
        <StatCard
          title="Learning Streak"
          value={progress?.learningStreak ?? 1}
          unit="days"
          subtitle="Consecutive study days"
          icon={Flame}
          color="amber"
        />
      </div>

      {/* Continue Learning Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Continue Learning
            </h2>
            <p className="text-xs text-slate-400">
              Pick up where you left off in your technical track
            </p>
          </div>
          <Link
            to="/subjects"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>View curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  AWS Cloud
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Beginner
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Cloud Computing Core
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                Understand on-demand infrastructure, CapEx vs OpEx, and AWS global architecture.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">15 mins</span>
              <Link
                to="/topics/cloud-computing"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow transition-all"
              >
                <Play className="w-3 h-3 fill-slate-950" />
                <span>Resume Lesson</span>
              </Link>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Python Track
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Essential
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Functions & Modularity
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                Write reusable routines, default arguments, and first-class functional logic.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">25 mins</span>
              <Link
                to="/topics/functions"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow transition-all"
              >
                <Play className="w-3 h-3 fill-slate-950" />
                <span>Resume Lesson</span>
              </Link>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Web Development
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Modern Web
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                JavaScript ES6 & Async
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                Promises, async/await, DOM interaction, and RESTful API consumption.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">25 mins</span>
              <Link
                to="/topics/javascript"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow transition-all"
              >
                <Play className="w-3 h-3 fill-slate-950" />
                <span>Resume Lesson</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Subjects Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Explore Subjects
          </h2>
          <p className="text-xs text-slate-400">
            Comprehensive learning curriculums with hands-on practice quizzes
          </p>
        </div>

        {loading ? (
          <SkeletonLoader type="card" count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((sub) => {
              const completedInSubject = (progress?.completedTopics || []).filter((id) =>
                id.startsWith(sub.id) || id.includes(sub.id.split("-")[0])
              ).length;

              return (
                <SubjectCard
                  key={sub.id}
                  subject={sub}
                  completedCount={completedInSubject}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* AI Learning Assistant Section */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/20 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 flex items-center space-x-4">
            <RobotIllustration className="w-24 h-24 shrink-0" mood="happy" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                AI Learning Assistant
              </span>
              <h3 className="text-xl font-bold text-white">
                Stuck on a topic?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ask StudyPilot AI for simple explanations and real-world analogies.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleQuickAsk} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                placeholder="Type your question... (e.g. 'Explain AWS Lambda' or 'What is an EC2 instance?')"
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm shadow-glow transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shrink-0"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI</span>
              </button>
            </form>

            {/* Quick suggested prompt pills */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-[11px] text-slate-400">Suggestions:</span>
              {[
                "Explain AWS Lambda",
                "What is EC2?",
                "Explain Python functions",
                "How does CSS work?"
              ].map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    navigate("/ai-assistant", { state: { initialQuestion: prompt } });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors border border-slate-700/60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
