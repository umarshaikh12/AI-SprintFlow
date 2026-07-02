import { useEffect, useState } from "react";
import { createTask, updateTask } from "../../api/taskApi";
import toast from "react-hot-toast";

function TaskModal({
  projectId,
  onClose,
  onTaskCreated,
  task,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority || "Medium");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    }
  }, [task]);

  const handleSubmit = async () => {
    try {
      const taskData = {
        title,
        description,
        priority,
        dueDate,
      };

      if (task) {
        await updateTask(task._id, taskData);
        toast.success("Task updated successfully!");
      } else {
        await createTask({
          ...taskData,
          project: projectId,
        });

        toast.success("Task created successfully!");
      }

      onTaskCreated();
      onClose();

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#1E293B] p-8">

        <h2 className="text-2xl font-semibold text-white">
          {task ? "Edit Task" : "Create Task"}
        </h2>

        {/* Title */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <textarea
            rows="4"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </div>

        {/* Priority */}
        <div className="mt-4">
          <label className="mb-2 block text-sm text-slate-300">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mt-4">
          <label className="mb-2 block text-sm text-slate-300">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-600 px-5 py-2.5 text-white hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-500"
          >
            {task ? "Update Task" : "Create Task"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskModal;