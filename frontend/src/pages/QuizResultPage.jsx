import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Award, RotateCcw, ArrowRight, BookOpen, CheckCircle2, TrendingUp } from "lucide-react";
import { RobotIllustration } from "../components/RobotIllustration";

export const QuizResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    total = 3,
    percentage = 0,
    subject = "Subject",
    topic = "Practice",
    subjectId = "aws-cloud",
    topicId = null
  } = location.state || {};

  const isPassed = percentage >= 60;

  return (
    <div className="max-w-lg mx-auto py-8 space-y-6 text-center pb-16">
      {/* Result Card */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <RobotIllustration className="w-32 h-32 mx-auto" mood={isPassed ? "happy" : "neutral"} />

        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
            {subject} • {topic}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {isPassed ? "Quiz Completed! 🎉" : "Good Effort! Keep Practicing 💪"}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isPassed
              ? "You demonstrated strong mastery of these core technical principles."
              : "Review the lesson material to strengthen key concepts and retry."}
          </p>
        </div>

        {/* Score & Percentage Display */}
        <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Score</span>
            <div className="text-3xl font-extrabold text-white">
              {score} <span className="text-sm font-semibold text-slate-500">/ {total}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Percentage</span>
            <div className={`text-3xl font-extrabold ${isPassed ? "text-emerald-400" : "text-amber-400"}`}>
              {percentage}%
            </div>
          </div>
        </div>

        {/* Required Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* Retry Quiz */}
          <button
            onClick={() => {
              if (topicId) {
                navigate(`/quiz?topic=${topicId}&subject=${subjectId}`);
              } else {
                navigate(`/quiz?subject=${subjectId}`);
              }
            }}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-glow transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Quiz</span>
          </button>

          {/* Back to Topic */}
          {topicId && (
            <Link
              to={`/topics/${topicId}`}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/20 text-sm font-semibold transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Back to Topic</span>
            </Link>
          )}

          {/* Continue Learning */}
          <Link
            to="/subjects"
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-sm font-medium transition-colors"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
