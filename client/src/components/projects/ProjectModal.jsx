import { useEffect, useState } from "react";
import {
  createProject,
  updateProject,
} from "../../api/projectApi";
import toast from "react-hot-toast";

function ProjectModal({ onClose, onProjectCreated, project }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [project]);

const handleSubmit = async () => {
  try {

    if (project) {

      await updateProject(project._id, {
          title,
          description,
        });

        toast.success("Project updated successfully!");

    } else {

      await createProject({
          title,
          description,
        });

        toast.success("Project created successfully!");

    }

    onProjectCreated();
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
          {project ? "Edit Project" : "Create New Project"}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          {project
            ? "Update your project details."
            : "Add a new project to AI SprintFlow."}
        </p>

        <div className="mt-6">
          <label className="text-sm text-slate-300">
            Project Name
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project name"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-slate-300">
            Description
          </label>

          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
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
            {project ? "Update Project" : "Create Project"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProjectModal;