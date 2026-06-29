import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import SearchBar from "../components/projects/SearchBar";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";

import {
  getProjects,
  deleteProject,
} from "../api/projectApi";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
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
      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Failed to delete project");
    }
  };

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

        <SearchBar />

        {/* Projects */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
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