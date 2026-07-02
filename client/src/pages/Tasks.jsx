import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import TaskModal from "../components/tasks/TaskModal";

import {
  getAllTasks,
  deleteTask,
  updateTaskStatus,
} from "../api/taskApi";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load tasks");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);

      toast.success("Task deleted");

      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <div className="ml-64 flex-1">

        <Navbar />

        <div className="p-8">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold text-white">
                Tasks
              </h1>

              <p className="mt-2 text-slate-400">
                Manage tasks from all projects
              </p>

            </div>

          </div>

          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
          />

          <div className="overflow-hidden rounded-2xl border border-slate-700">

            <table className="w-full">

              <thead className="bg-slate-900">

                <tr>

                  <th className="p-4 text-left text-slate-300">
                    Task
                  </th>

                  <th className="p-4 text-left text-slate-300">
                    Project
                  </th>

                  <th className="p-4 text-left text-slate-300">
                    Status
                  </th>

                  <th className="p-4 text-left text-slate-300">
                    Priority
                  </th>

                  <th className="p-4 text-center text-slate-300">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredTasks.map((task) => (

                  <tr
                    key={task._id}
                    className="border-t border-slate-800"
                  >

                    <td className="p-4 text-white">
                      {task.title}
                    </td>

                    <td className="p-4 text-slate-400">
                      {task.project?.title}
                    </td>

                    <td className="p-4">

                      <select
                        value={task.status}
                        onChange={async (e) => {
                          await updateTaskStatus(
                            task._id,
                            e.target.value
                          );

                          fetchTasks();
                        }}
                        className="rounded bg-violet-600 px-2 py-1 text-white"
                      >
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Done</option>
                      </select>

                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs text-white ${
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {task.priority}
                      </span>

                    </td>

                    <td className="space-x-2 p-4 text-center">

                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowModal(true);
                        }}
                        className="rounded bg-amber-500 px-3 py-1 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(task._id)}
                        className="rounded bg-red-500 px-3 py-1 text-white"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {showModal && (

        <TaskModal
          projectId={selectedTask?.project?._id}
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            setShowModal(false);
          }}
          onTaskCreated={fetchTasks}
        />

      )}

    </div>
  );
}

export default Tasks;