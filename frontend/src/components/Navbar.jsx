import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Flame, Bot, BookOpen } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const Navbar = ({ onOpenSidebar }) => {
  const { user, progress } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left side: Hamburger button + Page label */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-lg lg:hidden hover:bg-slate-800/60 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-200">StudyPilot Portal</span>
          <span>/</span>
          <span className="text-cyan-400">Student Space</span>
        </div>
      </div>

      {/* Right side: Streak pill, Quick Ask AI, and Profile */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Streak Counter */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          <span>{progress?.learningStreak || 1} Day Streak</span>
        </div>

        {/* Quick Ask AI button */}
        <Link
          to="/ai-assistant"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-semibold text-xs shadow-glow transition-all hover:scale-105 active:scale-95"
        >
          <Bot className="w-4 h-4 text-slate-950" />
          <span className="hidden md:inline">Ask StudyPilot AI</span>
          <span className="md:hidden">AI</span>
        </Link>

        {/* User Avatar */}
        {user ? (
          <Link
            to="/profile"
            className="flex items-center space-x-2 pl-2 border-l border-slate-800 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {user.name ? user.name.charAt(0).toUpperCase() : "S"}
            </div>
            <span className="text-xs font-medium text-slate-300 hidden sm:inline max-w-[100px] truncate">
              {user.name}
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 px-2 py-1"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
};
