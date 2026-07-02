import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import SearchBar from "../components/projects/SearchBar";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";

import toast from "react-hot-toast";

import {
  getProjects,
  deleteProject,
} from "../api/projectApi";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await getProjects();

      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      toast.success("Project deleted successfully!");

      fetchProjects();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete project");
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Projects
            </h1>

            <p className="mt-1 text-slate-400">
              Manage all your projects
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProject(null);
              setShowModal(true);
            }}
            className="rounded-xl bg-violet-600 px-5 py-3 text-white font-medium hover:bg-violet-500 transition"
          >
            + New Project
          </button>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Loading */}
        {loading ? (

          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500"></div>

              <p className="mt-4 text-slate-400">
                Loading Projects...
              </p>
            </div>
          </div>

        ) : projects.length === 0 ? (

          <div className="mt-20 flex flex-col items-center justify-center text-center">

            <div className="mb-6 text-7xl">
              📁
            </div>

            <h2 className="text-2xl font-semibold text-white">
              No Projects Yet
            </h2>

            <p className="mt-3 max-w-md text-slate-400">
              Create your first project and start managing tasks,
              teams and AI workflows.
            </p>

            <button
              onClick={() => {
                setSelectedProject(null);
                setShowModal(true);
              }}
              className="mt-8 rounded-xl bg-violet-600 px-6 py-3 text-white font-medium hover:bg-violet-500 transition"
            >
              + Create First Project
            </button>

          </div>

        ) : (

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

        )}

      </div>

      {showModal && (
        <ProjectModal
          onClose={handleCloseModal}
          onProjectCreated={fetchProjects}
          project={selectedProject}
        />
      )}
    </div>
  );
}

export default Projects;