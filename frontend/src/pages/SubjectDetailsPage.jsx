import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  Award,
  Play,
  Layers,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { SkeletonLoader } from "../components/SkeletonLoader";

export const SubjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress } = useAuth();

  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await api.getSubjectById(id);
        setSubject(res.subject);
      } catch (err) {
        setError(err.message || "Failed to load subject details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader type="topic" />
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="p-8 glass-panel rounded-2xl border border-slate-800 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">Subject Not Found</h3>
        <p className="text-xs text-slate-400">{error || "This subject does not exist."}</p>
        <Link
          to="/subjects"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Subjects</span>
        </Link>
      </div>
    );
  }

  const completedList = progress?.completedTopics || [];
  const completedTopicsCount = subject.topics.filter((t) =>
    completedList.includes(t.id)
  ).length;
  const progressPercent = Math.round(
    (completedTopicsCount / subject.topics.length) * 100
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <Link
        to="/subjects"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Subjects</span>
      </Link>

      {/* Hero Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {subject.category} • {subject.level}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {subject.title}
            </h1>
          </div>

          <Link
            to={`/quiz?subject=${subject.id}`}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-glow transition-all self-start sm:self-auto"
          >
            <Award className="w-4 h-4" />
            <span>Take Practice Quiz</span>
          </Link>
        </div>

        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          {subject.tagline}
        </p>

        {/* Progress bar */}
        <div className="pt-2 space-y-2 max-w-md">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>Progress: {completedTopicsCount} of {subject.topics.length} topics completed</span>
            <span className="text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topics List Header */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Curriculum Topics ({subject.topics.length})</span>
        </h2>
        <span className="text-xs text-slate-400">Click any topic to start reading</span>
      </div>

      {/* Topics Grid */}
      <div className="space-y-3">
        {subject.topics.map((topic, index) => {
          const isCompleted = completedList.includes(topic.id);

          return (
            <Link
              key={topic.id}
              to={`/topics/${topic.id}`}
              className="glass-card p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center space-x-4 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {topic.title}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        topic.difficulty === "Beginner"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                          : topic.difficulty === "Intermediate"
                          ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                          : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      }`}
                    >
                      {topic.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {topic.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 shrink-0 pl-3">
                <span className="hidden sm:flex items-center space-x-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{topic.estimatedTime}</span>
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-800/60 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
