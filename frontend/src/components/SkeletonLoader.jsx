import React from "react";

export const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 animate-pulse space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-800" />
              <div className="w-14 h-4 rounded-md bg-slate-800" />
            </div>
            <div className="w-24 h-6 rounded-md bg-slate-800" />
            <div className="w-36 h-4 rounded-md bg-slate-800/60" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "topic") {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="w-48 h-8 rounded-lg bg-slate-800" />
        <div className="w-full h-32 rounded-2xl bg-slate-900/60 border border-slate-800" />
        <div className="space-y-2">
          <div className="w-full h-4 rounded bg-slate-800/60" />
          <div className="w-5/6 h-4 rounded bg-slate-800/60" />
          <div className="w-4/6 h-4 rounded bg-slate-800/60" />
        </div>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="flex items-start space-x-3 p-4 animate-pulse">
        <div className="w-9 h-9 rounded-xl bg-slate-800" />
        <div className="space-y-2 flex-1">
          <div className="w-1/3 h-4 rounded bg-slate-800" />
          <div className="w-full h-12 rounded-xl bg-slate-800/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-20 rounded-xl bg-slate-800/50 animate-pulse" />
  );
};

export const AITypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit">
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      <span className="text-xs text-slate-400 pl-1 font-medium">StudyPilot AI is thinking...</span>
    </div>
  );
};
