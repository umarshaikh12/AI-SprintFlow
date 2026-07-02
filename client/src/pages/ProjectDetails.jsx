import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import KanbanBoard from "../components/tasks/KanbanBoard";

import { getProjectById } from "../api/projectApi";
import TaskList from "../components/tasks/TaskList";
import SprintList from "../components/sprints/SprintList";

import toast from "react-hot-toast";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [refresh]);
  const fetchProject = async () => {
    try {
      setLoading(true);

      const response = await getProjectById(id);

      setProject(response.data.project);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />

        <div className="ml-64 flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500"></div>

            <p className="mt-4 text-slate-400">
              Loading Project...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        {/* Project Header */}

        <div className="rounded-3xl border border-slate-700 bg-[#1E293B] p-8 shadow-xl">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-white">
                {project.title}
              </h1>

              <p className="mt-3 max-w-3xl text-slate-400">
                {project.description}
              </p>

            </div>

            <div className="flex gap-3">

              <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
                🟢 {project.status || "Active"}
              </span>

              <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
                📅 {new Date(project.createdAt).toLocaleDateString()}
              </span>

            </div>

          </div>

          {/* Progress */}

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-sm font-medium text-slate-300">
                Project Progress
              </span>

              <span className="text-lg font-bold text-violet-400">
                {progress}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-700">

              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

        <SprintList projectId={id} />

        {/* Kanban */}

        <KanbanBoard
          projectId={id}
          onTaskChanged={() => setRefresh((prev) => !prev)}
        />

          <TaskList
            projectId={id}
            refresh={refresh}
            onProgressChange={setProgress}
          />

      </div>
    </div>
  );
}

export default ProjectDetails;