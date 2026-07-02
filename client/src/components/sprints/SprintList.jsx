import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { generateSprintSummary } from "../../api/aiApi";

import SprintModal from "./SprintModal";

import {
  getSprintsByProject,
  deleteSprint,
  startSprint,
  completeSprint,
} from "../../api/sprintApi";

function SprintList({ projectId }) {
  const [sprints, setSprints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(null);
  const [expandedSummary, setExpandedSummary] = useState(null);

  useEffect(() => {
    fetchSprints();
  }, [projectId]);

  const fetchSprints = async () => {
    try {
      const response = await getSprintsByProject(projectId);

      setSprints(response.data.sprints);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load sprints");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sprint?")) return;

    try {
      await deleteSprint(id);

      toast.success("Sprint deleted");

      fetchSprints();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const handleGenerateSummary = async (id) => {
    try {
      setLoadingSummary(id);

      await generateSprintSummary(id);

      toast.success("AI Summary Generated!");

      fetchSprints();

    } catch (error) {
      console.log(error);

      toast.error("Failed to generate summary");
    } finally {
      setLoadingSummary(null);
    }
  };

  return (
    <>
      <div className="mt-8 rounded-2xl border border-slate-700 bg-[#1E293B] p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Sprints
            </h2>

            <p className="text-slate-400">
              {sprints.length} Sprint(s)
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedSprint(null);
              setShowModal(true);
            }}
            className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-500"
          >
            + Create Sprint
          </button>

        </div>

        {sprints.length === 0 ? (

          <p className="text-slate-400">
            No sprints created yet.
          </p>

        ) : (

          <div className="space-y-4">

            {sprints.map((sprint) => (

              <div
                key={sprint._id}
                className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl transition hover:border-violet-500 hover:shadow-violet-500/10"
              >

                <div className="space-y-6">

                  {/* Header */}

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                    <div className="flex-1">

                      <h3 className="text-2xl font-bold text-white">
                        {sprint.name}
                      </h3>

                      <p className="mt-3 max-w-4xl leading-7 text-slate-400">
                        {sprint.goal}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-slate-500">

                        <span>📅</span>

                        <span>
                          {new Date(sprint.startDate).toLocaleDateString()}
                        </span>

                        <span>→</span>

                        <span>
                          {new Date(sprint.endDate).toLocaleDateString()}
                        </span>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3">

                      {sprint.status === "Planning" && (
                        <>
                          <button
                            onClick={async () => {
                              try {
                                await startSprint(sprint._id);
                                toast.success("Sprint started!");
                                fetchSprints();
                              } catch (error) {
                                toast.error(
                                  error.response?.data?.message ||
                                  "Failed to start sprint"
                                );
                              }
                            }}
                            className="rounded-xl bg-green-600 px-5 py-2.5 text-white hover:bg-green-500"
                          >
                            ▶ Start
                          </button>

                          <button
                            onClick={() => {
                              setSelectedSprint(sprint);
                              setShowModal(true);
                            }}
                            className="rounded-xl bg-amber-500 px-5 py-2.5 text-white hover:bg-amber-400"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(sprint._id)}
                            className="rounded-xl bg-red-500 px-5 py-2.5 text-white hover:bg-red-400"
                          >
                            Delete
                          </button>
                        </>
                      )}

                      {sprint.status === "Active" && (
                        <button
                          onClick={async () => {
                            try {
                              await completeSprint(sprint._id);
                              toast.success("Sprint completed!");
                              fetchSprints();
                            } catch {
                              toast.error("Failed to complete sprint");
                            }
                          }}
                          className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-500"
                        >
                          ✔ Complete
                        </button>
                      )}

                      {sprint.status === "Completed" && (
                        <>
                          <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400">
                            ✔ Completed
                          </span>

                          <button
                            onClick={() => handleGenerateSummary(sprint._id)}
                            disabled={loadingSummary === sprint._id}
                            className="rounded-xl border border-violet-500 bg-violet-500/20 px-5 py-2.5 font-medium text-violet-300 transition hover:bg-violet-600 hover:text-white"
                          >
                            {loadingSummary === sprint._id
                              ? "Generating..."
                              : sprint.summary
                                ? "🔄 Regenerate"
                                : "✨ Generate"}
                          </button>
                        </>
                      )}

                    </div>

                  </div>

                  {/* AI Summary */}

                  {sprint.summary && (

                    <div className="border-t border-slate-700 pt-6">

                      <button
                        onClick={() =>
                          setExpandedSummary(
                            expandedSummary === sprint._id
                              ? null
                              : sprint._id
                          )
                        }
                        className="flex w-full items-center justify-between rounded-2xl border border-violet-700 bg-violet-950/20 px-6 py-5 transition hover:border-violet-500"
                      >

                        <div>

                          <h4 className="text-lg font-semibold text-violet-400">
                            🤖 AI Sprint Summary
                          </h4>

                          <p className="mt-1 text-sm text-slate-400">
                            Click to view AI-generated sprint insights
                          </p>

                        </div>

                        <span className="text-3xl text-violet-400">
                          {expandedSummary === sprint._id ? "−" : "+"}
                        </span>

                      </button>

                      {expandedSummary === sprint._id && (

                        <div className="mt-4 rounded-2xl border border-violet-700 bg-slate-950 p-6">

                          <p className="whitespace-pre-line leading-8 text-slate-300">
                            {sprint.summary}
                          </p>

                        </div>

                      )}

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {showModal && (

        <SprintModal
          projectId={projectId}
          sprint={selectedSprint}
          onClose={() => {
            setShowModal(false);
            setSelectedSprint(null);
          }}
          onSprintCreated={fetchSprints}
        />

      )}

    </>
  );
}

export default SprintList;