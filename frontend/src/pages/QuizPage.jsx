import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { SkeletonLoader } from "../components/SkeletonLoader";

export const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, refreshProgress } = useAuth();

  const subjectParam = searchParams.get("subject") || "aws-cloud";
  const topicParam = searchParams.get("topic");

  const [questions, setQuestions] = useState([]);
  const [quizMetadata, setQuizMetadata] = useState({ subject: "AWS Cloud", topic: "Comprehensive Quiz" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [submittingToBackend, setSubmittingToBackend] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      setError("");
      try {
        if (topicParam) {
          // Specific topic quiz
          const topicRes = await api.getTopicById(topicParam);
          if (topicRes.topic && topicRes.topic.quiz?.length > 0) {
            setQuestions(topicRes.topic.quiz);
            setQuizMetadata({
              subject: topicRes.topic.subjectTitle || "Subject",
              topic: topicRes.topic.title
            });
          } else {
            throw new Error("No quiz questions found for this topic.");
          }
        } else {
          // Subject level quiz
          const subRes = await api.getSubjectById(subjectParam);
          if (subRes.subject) {
            let pool = subRes.subject.quizzes || [];
            if (pool.length === 0) {
              // Aggregate questions from topics
              subRes.subject.topics.forEach((t) => {
                if (t.quiz) pool.push(...t.quiz);
              });
            }
            setQuestions(pool);
            setQuizMetadata({
              subject: subRes.subject.title,
              topic: "Subject Mastery Quiz"
            });
          } else {
            throw new Error("Subject not found.");
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load quiz questions.");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [subjectParam, topicParam]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Final question reached: submit score to backend
      setSubmittingToBackend(true);
      const finalScore = selectedOption === currentQ.correctAnswer ? score : score;
      const total = questions.length;

      try {
        const result = await api.submitQuiz({
          userId: user?.id,
          subject: quizMetadata.subject,
          topic: quizMetadata.topic,
          score: finalScore,
          total
        });

        await refreshProgress();

        // Redirect to Quiz Result Page with payload state
        navigate("/quiz/result", {
          state: {
            score: result.score,
            total: result.total,
            percentage: result.percentage,
            subject: quizMetadata.subject,
            topic: quizMetadata.topic,
            subjectId: subjectParam,
            topicId: topicParam
          }
        });
      } catch (err) {
        alert("Failed to record quiz submission: " + err.message);
        setSubmittingToBackend(false);
      }
    }
  };

  const handleRetryQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <SkeletonLoader type="topic" />
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="max-w-md mx-auto p-8 glass-panel rounded-3xl border border-slate-800 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
        <h3 className="text-lg font-bold text-white">Quiz Unavailable</h3>
        <p className="text-xs text-slate-400">{error || "No questions found for this quiz."}</p>
        <Link
          to="/subjects"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-glow"
        >
          <span>Return to Subjects</span>
        </Link>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctAnswer;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      {/* Quiz Header Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
              {quizMetadata.subject}
            </span>
            <h1 className="text-xl font-bold text-white">
              {quizMetadata.topic}
            </h1>
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400">
            Select the correct answer:
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let optionStyles = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";

            if (isAnswerSubmitted) {
              if (idx === currentQ.correctAnswer) {
                optionStyles = "bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-sm";
              } else if (idx === selectedOption) {
                optionStyles = "bg-rose-500/15 border-rose-500 text-rose-200 shadow-sm";
              } else {
                optionStyles = "bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60";
              }
            } else if (selectedOption === idx) {
              optionStyles = "bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-glow";
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between group ${optionStyles}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswerSubmitted && idx === selectedOption && idx !== currentQ.correctAnswer && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback & Explanation */}
        {isAnswerSubmitted && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 animate-fadeIn ${
              isCorrect
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                : "bg-rose-500/10 border-rose-500/30 text-rose-200"
            }`}
          >
            <div className="flex items-center space-x-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Incorrect</span>
                </>
              )}
            </div>
            <p className="text-slate-300 pt-1">{currentQ.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Score: <strong className="text-cyan-400">{score}</strong> / {questions.length}
          </span>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={submittingToBackend}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-glow transition-all hover:scale-105 active:scale-95"
            >
              {submittingToBackend ? (
                <span>Recording score...</span>
              ) : (
                <>
                  <span>{currentIndex + 1 < questions.length ? "Next Question" : "View Final Results"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
