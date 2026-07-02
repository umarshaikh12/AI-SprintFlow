import { useEffect, useState } from "react";
import {
  generateSubtasks,
  estimateTaskEffort,
} from "../../api/aiApi";
import toast from "react-hot-toast";

import TaskModal from "./TaskModal";

import {
  getTasksByProject,
  deleteTask,
  updateTaskStatus,
} from "../../api/taskApi";

function TaskList({
  projectId,
  refresh,
  onProgressChange,
}) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [generatingTaskId, setGeneratingTaskId] = useState(null);
  const [estimatingTaskId, setEstimatingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [projectId, refresh]);

  const fetchTasks = async () => {
    try {
      const response = await getTasksByProject(projectId);

      const data = response.data.tasks || [];

      setTasks(data);

      if (onProgressChange) {
        if (data.length === 0) {
          onProgressChange(0);
        } else {
          const completed = data.filter(
            (task) => task.status === "Done"
          ).length;

          const progress = Math.round(
            (completed / data.length) * 100
          );

          onProgressChange(progress);
        }
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to load tasks");
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);

      toast.success("Task deleted");

      fetchTasks();

    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  };

  const handleGenerateSubtasks = async (taskId) => {
    try {
      setGeneratingTaskId(taskId);

      await generateSubtasks(taskId);

      toast.success("AI Subtasks Generated!");

      fetchTasks();

    } catch (error) {
      console.log(error);

      toast.error("Failed to generate subtasks");
    } finally {
      setGeneratingTaskId(null);
    }
  };

  const handleEstimateEffort = async (taskId) => {
    try {
      setEstimatingTaskId(taskId);

      await estimateTaskEffort(taskId);

      toast.success("Effort Estimated!");

      fetchTasks();

    } catch (error) {
      console.log(error);

      toast.error("Failed to estimate effort");
    } finally {
      setEstimatingTaskId(null);
    }
  };

  return (
    <>
      <div className="mt-8 rounded-2xl border border-slate-700 bg-[#1E293B] p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-white">
              Tasks
            </h2>

            <p className="text-slate-400">
              {tasks.length} Task(s)
            </p>

          </div>

          <button
            onClick={() => {
              setSelectedTask(null);
              setShowModal(true);
            }}
            className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-500"
          >
            + Add Task
          </button>

        </div>

        {tasks.length === 0 ? (

          <p className="text-slate-400">
            No tasks yet.
          </p>

        ) : (

          <div className="space-y-4">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="rounded-xl border border-slate-700 bg-slate-900 p-4"
              >

                <h3 className="font-semibold text-white">
                  {task.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {task.description}
                </p>
                {task.subtasks?.length > 0 && (

                  <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950 p-4">

                    <h4 className="mb-3 font-semibold text-violet-400">
                      ✨ AI Generated Subtasks
                    </h4>

                    <div className="space-y-2">

                      {task.subtasks.map((subtask) => (

                        <label
                          key={subtask._id}
                          className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-slate-800"
                        >

                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            readOnly
                            className="h-4 w-4 accent-violet-500"
                          />

                          <span
                            className={
                              subtask.completed
                                ? "text-slate-500 line-through"
                                : "text-slate-300"
                            }
                          >
                            {subtask.title}
                          </span>

                        </label>

                      ))}

                    </div>

                  </div>

                )}

                {task.storyPoints > 0 && (

                  <div className="mt-4 rounded-xl border border-sky-700 bg-sky-950/40 p-4">

                    <h4 className="mb-3 font-semibold text-sky-400">
                      ⚡ AI Effort Estimation
                    </h4>

                    <div className="grid gap-4 md:grid-cols-3">

                      <div className="rounded-lg bg-slate-900 p-3 text-center">

                        <p className="text-sm text-slate-400">
                          Difficulty
                        </p>

                        <p className="mt-2 text-lg font-bold text-white">
                          {task.difficulty}
                        </p>

                      </div>

                      <div className="rounded-lg bg-slate-900 p-3 text-center">

                        <p className="text-sm text-slate-400">
                          Story Points
                        </p>

                        <p className="mt-2 text-lg font-bold text-white">
                          {task.storyPoints}
                        </p>

                      </div>

                      <div className="rounded-lg bg-slate-900 p-3 text-center">

                        <p className="text-sm text-slate-400">
                          Estimated Hours
                        </p>

                        <p className="mt-2 text-lg font-bold text-white">
                          {task.estimatedHours} hrs
                        </p>

                      </div>

                    </div>

                  </div>

                )}

                {task.dueDate && (

                  <p className="mt-2 text-xs text-slate-500">
                    📅 {new Date(task.dueDate).toLocaleDateString()}
                  </p>

                )}

                <div className="mt-4 flex items-center justify-between">

                  <div className="flex gap-3">

                    <select
                      value={task.status}
                      onChange={async (e) => {
                        try {
                          await updateTaskStatus(
                            task._id,
                            e.target.value
                          );

                          toast.success("Status updated");

                          fetchTasks();

                        } catch (error) {
                          console.log(error);
                          toast.error("Failed to update");
                        }
                      }}
                      className="rounded-lg bg-violet-600 px-3 py-1 text-xs text-white outline-none"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Done">
                        Done
                      </option>
                    </select>

                    <span
                      className={`rounded-full px-3 py-1 text-xs text-white ${task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                          ? "bg-amber-500"
                          : "bg-green-500"
                        }`}
                    >
                      {task.priority}
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() => handleGenerateSubtasks(task._id)}
                      disabled={generatingTaskId === task._id}
                      className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-500 disabled:opacity-50"
                    >
                      {generatingTaskId === task._id
                        ? "Generating..."
                        : "✨ AI Subtasks"}
                    </button>

                    <button
                      onClick={() => handleEdit(task)}
                      className="rounded-lg bg-amber-500 px-4 py-2 text-sm text-white hover:bg-amber-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleEstimateEffort(task._id)}
                      disabled={estimatingTaskId === task._id}
                      className="rounded-lg bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 disabled:opacity-50"
                    >
                      {estimatingTaskId === task._id
                        ? "Estimating..."
                        : "⚡ Estimate Effort"}
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-400"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {showModal && (

        <TaskModal
          projectId={projectId}
          task={selectedTask}
          onClose={handleClose}
          onTaskCreated={fetchTasks}
        />

      )}

    </>
  );
}

export default TaskList;