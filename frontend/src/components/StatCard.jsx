import React from "react";

export const StatCard = ({ title, value, unit = "", icon: Icon, subtitle, color = "cyan" }) => {
  const colorMap = {
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
      glow: "group-hover:border-cyan-500/40"
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
      glow: "group-hover:border-amber-500/40"
    },
    indigo: {
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      text: "text-indigo-400",
      glow: "group-hover:border-indigo-500/40"
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      glow: "group-hover:border-emerald-500/40"
    }
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div
      className={`glass-card group p-5 rounded-2xl border ${scheme.border} ${scheme.glow} transition-all duration-300 relative overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl ${scheme.bg} flex items-center justify-center ${scheme.text} group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-1">
        <span className="text-3xl font-extrabold text-white tracking-tight">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
      )}
    </div>
  );
};
