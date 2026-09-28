import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";
import { RobotIllustration } from "../components/RobotIllustration";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link to="/" className="inline-flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-black text-white tracking-tight">
            Study<span className="text-cyan-400">Pilot</span>
          </span>
        </Link>
        <p className="mt-2 text-sm text-slate-400 font-medium">
          Learn Smarter. Practice Better. Grow Faster.
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 z-10">
        <div className="glass-panel py-8 px-6 sm:px-10 rounded-3xl shadow-2xl border border-slate-800/80">
          <Outlet />
        </div>
      </div>

      {/* Bottom helper */}
      <div className="mt-8 text-center text-xs text-slate-400 z-10 flex items-center justify-center space-x-1">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Powered by AWS Bedrock AI and Next-Gen Learning Workflows</span>
      </div>
    </div>
  );
};
