import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import StatsCard from "../components/dashboard/StatsCard";

import {
  FolderKanban,
  CheckSquare,
  CircleCheckBig,
  Clock3,
  Sparkles,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="ml-64 flex-1">

        <Navbar />

        <div className="p-8">

          {/* Welcome */}

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">
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
              value="12"
              icon={<FolderKanban className="text-white" />}
              color="bg-violet-600"
            />

            <StatsCard
              title="Tasks"
              value="86"
              icon={<CheckSquare className="text-white" />}
              color="bg-blue-600"
            />

            <StatsCard
              title="Completed"
              value="64"
              icon={<CircleCheckBig className="text-white" />}
              color="bg-emerald-600"
            />

            <StatsCard
              title="Pending"
              value="22"
              icon={<Clock3 className="text-white" />}
              color="bg-amber-500"
            />

          </div>

          {/* Bottom Section */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            {/* Recent Projects */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-6 text-2xl font-bold text-white">
                Recent Projects
              </h2>

              <div className="space-y-4">

                <div className="rounded-xl bg-slate-800 p-4">
                  <h3 className="font-semibold text-white">
                    AI SprintFlow
                  </h3>

                  <p className="text-slate-400">
                    Sprint 1 in progress
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800 p-4">
                  <h3 className="font-semibold text-white">
                    E-Commerce Platform
                  </h3>

                  <p className="text-slate-400">
                    UI Development
                  </p>
                </div>

              </div>

            </div>

            {/* AI Assistant */}

            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-violet-700 to-indigo-700 p-6">

              <div className="flex items-center gap-3">

                <Sparkles className="text-white" />

                <h2 className="text-2xl font-bold text-white">
                  AI Assistant
                </h2>

              </div>

              <p className="mt-6 text-white/80">
                Generate sprint plans, create tasks, summarize project
                progress, and get AI-powered recommendations.
              </p>

              <button className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:scale-105">
                Try AI
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;