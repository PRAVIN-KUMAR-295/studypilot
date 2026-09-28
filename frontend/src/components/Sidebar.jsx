import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  HelpCircle,
  Bot,
  TrendingUp,
  User,
  Settings,
  LogOut,
  X,
  Compass
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: Home },
    { name: "Subjects", path: "/subjects", icon: BookOpen },
    { name: "Practice Quizzes", path: "/quiz", icon: HelpCircle },
    { name: "AI Assistant", path: "/ai-assistant", icon: Bot, badge: "AI" },
    { name: "Progress", path: "/progress", icon: TrendingUp },
    { name: "Profile", path: "/profile", icon: User }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B1120]/95 backdrop-blur-xl border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/60">
          <NavLink to="/dashboard" className="flex items-center space-x-3 group" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                Study<span className="text-cyan-400">Pilot</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold block -mt-1">
                Learning Platform
              </span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg lg:hidden"
            aria-label="Close navigation sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Student Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 transition-colors group-hover:text-cyan-400" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800/60 space-y-3">
          {/* User profile card */}
          {user && (
            <div className="flex items-center space-x-3 px-2 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-200 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-900/40 rounded-lg transition-colors border border-rose-900/30"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              <span>StudyPilot Settings</span>
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Configure your learning platform preferences.
            </p>

            <div className="space-y-4">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  AI Assistant Provider
                </span>
                <p className="text-xs text-slate-400">
                  Default mode: Amazon Bedrock (with automatic local knowledge engine fallback).
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  Cloud Synchronized Learning
                </span>
                <p className="text-xs text-slate-400">
                  Progress, quiz history, and learning streaks are continuously synced.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-glow"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
