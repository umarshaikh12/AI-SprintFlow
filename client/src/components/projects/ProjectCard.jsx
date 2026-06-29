function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#1E293B] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            {project.title}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            {project.description}
          </p>
        </div>

        <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
          {project.status || "Active"}
        </span>
      </div>

      <div className="mt-6 flex gap-3">

        <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500">
          View Project
        </button>

        <button
          onClick={() => onEdit(project)}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-400"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ProjectCard;