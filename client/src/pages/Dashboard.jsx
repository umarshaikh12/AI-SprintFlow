import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import StatsCard from "../components/dashboard/StatsCard";
import { getActiveSprint } from "../api/sprintApi";
import { useNavigate } from "react-router-dom";

import {
  getDashboardStats,
  getRecentProjects,
} from "../api/dashboardApi";

import {
  FolderKanban,
  CheckSquare,
  CircleCheckBig,
  Clock3,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSprint, setActiveSprint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [
        statsResponse,
        projectsResponse,
        sprintResponse,
      ] = await Promise.all([
        getDashboardStats(),
        getRecentProjects(),
        getActiveSprint(),
      ]);

      setStats(statsResponse.data.stats);
      setRecentProjects(projectsResponse.data.projects);
      setActiveSprint(sprintResponse.data.sprint);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500"></div>

          <p className="mt-4 text-slate-400">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <div className="ml-64 flex-1">

        <Navbar />

        <div className="p-8">

          {/* Welcome */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-white">
              Welcome Back 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Here's what's happening with your projects today.
            </p>

          </div>

          {/* Stats */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
              title="Projects"
              value={stats.totalProjects}
              icon={<FolderKanban className="text-white" />}
              color="bg-violet-600"
            />

            <StatsCard
              title="Tasks"
              value={stats.totalTasks}
              icon={<CheckSquare className="text-white" />}
              color="bg-blue-600"
            />

            <StatsCard
              title="Completed"
              value={stats.completedTasks}
              icon={<CircleCheckBig className="text-white" />}
              color="bg-emerald-600"
            />

            <StatsCard
              title="Pending"
              value={stats.pendingTasks}
              icon={<Clock3 className="text-white" />}
              color="bg-amber-500"
            />

          </div>

          {/* Bottom Section */}

          {/* Bottom Section */}

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">

            {/* Recent Projects */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-6 text-2xl font-bold text-white">
                Recent Projects
              </h2>

              {recentProjects.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/40 p-10 text-center">

                  <div className="mb-4 text-5xl">
                    📂
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    No Projects Yet
                  </h3>

                  <p className="mt-2 text-slate-400">
                    Create your first project to start planning sprints.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {recentProjects.map((project) => (

                    <div
                      key={project._id}
                      className="group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/20"
                    >

                      <div className="flex items-start justify-between">

                        <div>

                          <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition">
                            {project.title}
                          </h3>

                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                            {project.description}
                          </p>

                        </div>

                        <div className="rounded-xl bg-violet-600/20 px-3 py-2 text-xl">
                          📁
                        </div>

                      </div>

                      <div className="mt-5 flex items-center justify-between">

                        <span className="text-xs text-slate-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>

                        <button
                          onClick={() => navigate(`/projects/${project._id}`)}
                          className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                        >
                          View →
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* Active Sprint */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-6 text-2xl font-bold text-white">
                Active Sprint
              </h2>

              {activeSprint ? (

                <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-violet-500 hover:shadow-violet-500/20">

                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl"></div>

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm text-violet-400 font-medium">
                        🚀 Active Sprint
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-white">
                        {activeSprint.name}
                      </h3>

                      <p className="mt-2 text-slate-400">
                        {activeSprint.goal}
                      </p>

                    </div>

                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                      🟢 {activeSprint.status}
                    </span>

                  </div>

                  <div className="my-6 border-t border-slate-700"></div>

                  <div className="grid grid-cols-2 gap-5">

                    <div>

                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Project
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {activeSprint.project?.title}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        End Date
                      </p>

                      <p className="mt-1 font-semibold text-white">
                        {new Date(activeSprint.endDate).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="mb-2 flex justify-between">

                      <span className="text-sm text-slate-400">
                        Sprint Progress
                      </span>

                      <span className="text-sm font-semibold text-violet-400">
                        {activeSprint.progress}%
                      </span>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-700">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 transition-all duration-700"
                        style={{
                          width: `${activeSprint.progress}%`,
                        }}
                      ></div>

                    </div>
                    <div className="mt-3 flex justify-between text-sm">

                      <span className="text-slate-400">
                        Completed Tasks
                      </span>

                      <span className="font-semibold text-white">
                        {activeSprint.completedTasks} / {activeSprint.totalTasks}
                      </span>

                    </div>

                    <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">

                      <p className="text-xs uppercase tracking-wider text-violet-300">
                        AI Insight
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {activeSprint.progress >= 80
                          ? "🚀 Excellent progress! You're close to completing this sprint."
                          : activeSprint.progress >= 50
                            ? "⚡ Good momentum. Keep pushing to finish on time."
                            : "📌 Sprint is still in the early stage. Focus on completing high-priority tasks first."}
                      </p>

                    </div>

                  </div>

                </div>

              ) : (

                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/40 p-10 text-center">

                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 text-3xl">
                    🚀
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    No Active Sprint
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Start a sprint to track your team's progress.
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* AI Assistant */}

          <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-violet-700 to-indigo-700 p-6">

            <div className="flex items-center gap-3">

              <Sparkles className="text-white" />

              <h2 className="text-2xl font-bold text-white">
                AI Assistant
              </h2>

            </div>

            <p className="mt-6 text-white/80">
              Generate sprint plans, create tasks, summarize project progress,
              prioritize work and receive AI-powered recommendations.
            </p>

            <button
              onClick={() => navigate("/ai")}
              className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:scale-105"
            >
              Open AI Assistant →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;