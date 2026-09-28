import React, { useState, useEffect } from "react";
import { BookOpen, Search, Filter } from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { SubjectCard } from "../components/SubjectCard";
import { SkeletonLoader } from "../components/SkeletonLoader";

export const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { progress } = useAuth();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.getSubjects();
        setSubjects(res.subjects || []);
      } catch (err) {
        console.error("Failed to load subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const categories = ["All", "Cloud Computing", "Programming", "Full Stack"];

  const filteredSubjects = subjects.filter((sub) => {
    const matchesSearch =
      sub.title.toLowerCase().includes(search.toLowerCase()) ||
      sub.tagline.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curated Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Technical Subjects
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse structured learning paths with interactive lessons, code examples, and quizzes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subjects..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
              selectedCategory === cat
                ? "bg-cyan-500 text-slate-950 font-bold shadow-glow"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subjects Grid */}
      {loading ? (
        <SkeletonLoader type="card" count={4} />
      ) : filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((sub) => {
            const completedInSub = (progress?.completedTopics || []).filter((id) =>
              id.startsWith(sub.id) || id.includes(sub.id.split("-")[0])
            ).length;

            return (
              <SubjectCard
                key={sub.id}
                subject={sub}
                completedCount={completedInSub}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-2xl border border-slate-800 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No subjects found</h3>
          <p className="text-xs text-slate-400">
            No subjects matched your search term "{search}". Try searching for AWS, Python, Java, or Web.
          </p>
        </div>
      )}
    </div>
  );
};
