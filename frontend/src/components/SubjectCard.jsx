import React from "react";
import { Link } from "react-router-dom";
import { Cloud, Code2, Coffee, Globe, ArrowRight, Layers, Award } from "lucide-react";

const iconMap = {
  Cloud: Cloud,
  Code2: Code2,
  Coffee: Coffee,
  Globe: Globe
};

export const SubjectCard = ({ subject, completedCount = 0 }) => {
  const Icon = iconMap[subject.icon] || Code2;
  const total = subject.topicsCount || 6;
  const progressPercent = Math.round((completedCount / total) * 100);

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-glow">
            <Icon className="w-6 h-6" />
          </div>
          <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
            {subject.level || "Beginner"}
          </span>
        </div>

        {/* Title and Tagline */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
          {subject.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {subject.tagline}
        </p>

        {/* Progress Bar */}
        <div className="space-y-1.5 mb-5">
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span className="flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>{completedCount} / {total} Topics</span>
            </span>
            <span className="text-cyan-400 font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center space-x-2">
        <Link
          to={`/subjects/${subject.id}`}
          className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-xs font-semibold transition-all group-hover:border-cyan-500/40"
        >
          <span>Explore Topics</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to={`/quiz?subject=${subject.id}`}
          className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold transition-colors"
          title="Take Practice Quiz"
        >
          <Award className="w-4 h-4 text-amber-400" />
        </Link>
      </div>
    </div>
  );
};
