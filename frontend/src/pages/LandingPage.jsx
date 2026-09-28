import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  ArrowRight,
  Bot,
  BookOpen,
  Award,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Cloud,
  Code2,
  Coffee,
  Globe
} from "lucide-react";
import { RobotIllustration } from "../components/RobotIllustration";
import { useAuth } from "../hooks/useAuth";

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: "Learn",
      desc: "Explore key technical topics in clear, student-friendly language.",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Practice",
      desc: "Test your knowledge with immediate quizzes and comprehensive explanations.",
      icon: Award,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Track",
      desc: "Monitor your progress, daily active streaks, and quiz performance analytics.",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Ask AI",
      desc: "Get instant explanations and intuitive analogies from your AI mentor.",
      icon: Bot,
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const subjects = [
    { title: "AWS Cloud", icon: Cloud, count: "6 Topics", color: "text-amber-400" },
    { title: "Python", icon: Code2, count: "8 Topics", color: "text-emerald-400" },
    { title: "Java", icon: Coffee, count: "7 Topics", color: "text-rose-400" },
    { title: "Web Development", icon: Globe, count: "6 Topics", color: "text-cyan-400" }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="border-b border-slate-800/80 bg-[#0B1120]/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-glow">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white">
              Study<span className="text-cyan-400">Pilot</span>
            </span>
          </Link>

          <nav className="flex items-center space-x-3 sm:space-x-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs sm:text-sm shadow-glow transition-all"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-glow hover:scale-105"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-12 pb-20 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Generation AI Student Learning</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                Learn Smarter. <br />
                <span className="text-gradient-cyan">Practice Better.</span> <br />
                Grow Faster.
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                StudyPilot is an AI-powered learning platform that helps students understand concepts, practice through quizzes, and track their learning progress in one place.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/signup"}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm shadow-glow transition-all hover:scale-105 active:scale-95"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/ai-assistant"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 font-semibold text-sm transition-all shadow-sm"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Ask AI</span>
                </Link>
              </div>

              {/* Guarantees */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Quizzes & Instant Feedback</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Bedrock AI with Local Fallback</span>
                </div>
              </div>
            </div>

            {/* Right Column: AI Assistant Robot Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/20 shadow-glow max-w-sm w-full text-center">
                <div className="mb-4">
                  <RobotIllustration className="w-48 h-48 mx-auto" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white flex items-center justify-center space-x-2">
                    <span>StudyPilot AI</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    "I'm your personal learning copilot. Ask me questions about AWS, Python, Java, or Web Dev, and I'll break them down with simple analogies!"
                  </p>
                </div>
                <div className="mt-5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left">
                  <span className="text-[11px] text-cyan-400 font-semibold uppercase tracking-wider block mb-1">
                    Try Asking:
                  </span>
                  <p className="text-xs text-slate-300 font-mono italic">
                    "Explain AWS Lambda in simple terms"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16 bg-[#0B1120]/50 border-t border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Everything You Need to Excel
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                A structured 5-step learning workflow engineered for student success.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 space-y-4"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{f.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Subjects Preview Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Curated Technical Subjects
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                From zero to production-grade proficiency.
              </p>
            </div>
            <Link
              to="/subjects"
              className="mt-3 sm:mt-0 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>Explore all subjects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((sub, idx) => {
              const SubIcon = sub.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors flex items-center space-x-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center">
                    <SubIcon className={`w-5 h-5 ${sub.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{sub.title}</h4>
                    <span className="text-[11px] text-slate-400">{sub.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          <p>© 2026 StudyPilot. Learn Smarter. Practice Better. Grow Faster.</p>
        </div>
      </footer>
    </div>
  );
};
