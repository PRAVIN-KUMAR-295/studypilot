import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  CheckCircle2,
  Award,
  Flame,
  Clock,
  Layers,
  Calendar,
  RotateCcw
} from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { StatCard } from "../components/StatCard";
import { SkeletonLoader } from "../components/SkeletonLoader";

export const ProgressPage = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.getProgress();
        setProgressData(res.progress);
      } catch (err) {
        console.error("Failed to load progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader type="card" count={4} />
      </div>
    );
  }

  const {
    topicsCompleted = 0,
    quizzesCompleted = 0,
    averageScore = 0,
    learningStreak = 1,
    quizHistory = [],
    subjectProgress = []
  } = progressData || {};

  // Total topics available across all 4 subjects = 6 + 8 + 7 + 6 = 27
  const totalCurriculumTopics = 27;
  const overallCompletionPercentage = Math.round(
    (topicsCompleted / totalCurriculumTopics) * 100
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Performance & Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Learning Progress
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review your completion milestones, quiz performance scores, and daily study streaks.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Progress"
          value={overallCompletionPercentage}
          unit="%"
          subtitle={`${topicsCompleted} of ${totalCurriculumTopics} total topics`}
          icon={Layers}
          color="cyan"
        />
        <StatCard
          title="Average Score"
          value={averageScore}
          unit="%"
          subtitle="Across all practice quizzes"
          icon={TrendingUp}
          color="indigo"
        />
        <StatCard
          title="Topics Completed"
          value={topicsCompleted}
          unit="topics"
          subtitle="Marked complete"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Learning Streak"
          value={learningStreak}
          unit="days"
          subtitle="Consecutive study streak"
          icon={Flame}
          color="amber"
        />
      </div>

      {/* Subject-by-Subject Progress Breakdown */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Curriculum Breakdown by Subject
          </h2>
          <p className="text-xs text-slate-400">
            Real-time completion percentage for each major technical subject
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjectProgress.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">{sub.title}</span>
                <span className="text-xs font-semibold text-cyan-400">
                  {sub.completedTopics} / {sub.totalTopics} Topics ({sub.completionPercentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${sub.completionPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Quiz Results Table */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Recent Quiz Results
            </h2>
            <p className="text-xs text-slate-400">
              Your latest practice attempts and graded results
            </p>
          </div>
          <Link
            to="/quiz"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Take new quiz
          </Link>
        </div>

        {quizHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Subject / Topic</th>
                  <th className="pb-3 font-semibold">Score</th>
                  <th className="pb-3 font-semibold">Percentage</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {quizHistory.map((item) => {
                  const isPassed = item.percentage >= 60;
                  const dateStr = new Date(item.createdAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  });

                  return (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 pr-4">
                        <span className="font-bold text-white block">{item.subject}</span>
                        <span className="text-[11px] text-slate-500">{item.topic}</span>
                      </td>
                      <td className="py-3.5 pr-4 font-mono font-bold">
                        {item.score} / {item.total}
                      </td>
                      <td className="py-3.5 pr-4 font-bold">
                        <span className={isPassed ? "text-emerald-400" : "text-amber-400"}>
                          {item.percentage}%
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 text-slate-500">
                        {dateStr}
                      </td>
                      <td className="py-3.5 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isPassed
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {isPassed ? "Passed" : "Needs Review"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2">
            <Award className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-semibold text-white">No quizzes taken yet</p>
            <p className="text-xs text-slate-400">
              Practice what you've learned to build your score record!
            </p>
            <div className="pt-2">
              <Link
                to="/quiz"
                className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-glow"
              >
                <span>Take First Quiz</span>
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
