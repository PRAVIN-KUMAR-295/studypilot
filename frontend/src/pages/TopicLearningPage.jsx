import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Award,
  Bot,
  Sparkles,
  BookOpen,
  Code,
  Check
} from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { SkeletonLoader } from "../components/SkeletonLoader";

export const TopicLearningPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, refreshProgress } = useAuth();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await api.getTopicById(id);
        setTopic(res.topic);
      } catch (err) {
        setError(err.message || "Failed to load topic.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  const handleMarkCompleted = async () => {
    if (marking) return;
    setMarking(true);
    try {
      await api.completeTopic(id);
      await refreshProgress();
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 4000);
    } catch (err) {
      alert("Failed to mark topic as completed: " + err.message);
    } finally {
      setMarking(false);
    }
  };

  const handleAskAI = () => {
    navigate("/ai-assistant", {
      state: {
        initialQuestion: `Explain ${topic.title} in simple student language with an example.`,
        topicContext: topic.title
      }
    });
  };

  const handleTakeQuiz = () => {
    navigate(`/quiz?topic=${topic.id}&subject=${topic.subjectId}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader type="topic" />
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="p-8 glass-panel rounded-2xl border border-slate-800 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">Topic Not Found</h3>
        <p className="text-xs text-slate-400">{error || "Could not find topic details."}</p>
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

  const isCompleted = progress?.completedTopics?.includes(topic.id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to={`/subjects/${topic.subjectId}`}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {topic.subjectTitle || "Subject"}</span>
        </Link>

        {isCompleted && (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        )}
      </div>

      {/* Celebratory Banner upon completion */}
      {justCompleted && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Great job! Topic marked as completed. Your learning streak & dashboard progress have been updated!</span>
          </div>
          <button
            onClick={() => setJustCompleted(false)}
            className="text-xs text-emerald-400 hover:underline shrink-0 pl-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Topic Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            {topic.subjectTitle}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              topic.difficulty === "Beginner"
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                : topic.difficulty === "Intermediate"
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
            }`}
          >
            {topic.difficulty}
          </span>
          <span className="flex items-center space-x-1 text-xs text-slate-400 pl-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated time: {topic.estimatedTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {topic.title}
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed">
          {topic.description}
        </p>

        {/* Quick Assistant / Quiz Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={handleAskAI}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all shadow-sm"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Ask AI about this topic</span>
          </button>

          <button
            onClick={handleTakeQuiz}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold shadow-glow transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Take Topic Quiz ({topic.quiz?.length || 1} questions)</span>
          </button>
        </div>
      </div>

      {/* Concept Explanation */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>Concept Explanation</span>
        </h2>
        <div className="text-sm text-slate-300 leading-relaxed space-y-3 font-normal">
          <p>{topic.explanation}</p>
        </div>
      </section>

      {/* Key Points */}
      {topic.keyPoints && topic.keyPoints.length > 0 && (
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Key Points to Remember</span>
          </h2>
          <ul className="space-y-3">
            {topic.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Examples & Code */}
      {topic.examples && (
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <Code className="w-5 h-5 text-indigo-400" />
            <span>Practical Example & Implementation</span>
          </h2>
          <div className="rounded-2xl bg-[#030712] p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs sm:text-sm font-mono text-cyan-300 leading-relaxed">
              <code>{topic.examples}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Bottom Completion Action */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Finished reading this lesson?</h3>
          <p className="text-xs text-slate-400">
            Marking as completed updates your learning metrics and advances your track.
          </p>
        </div>

        <button
          onClick={handleMarkCompleted}
          disabled={marking || isCompleted}
          className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-glow transition-all ${
            isCompleted
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default"
              : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:scale-105 active:scale-95"
          }`}
        >
          {marking ? (
            <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : isCompleted ? (
            <>
              <Check className="w-4 h-4" />
              <span>Marked as Completed ✓</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Completed</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
