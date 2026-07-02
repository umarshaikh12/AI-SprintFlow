import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import { Sparkles, Wand2, Save } from "lucide-react";

import toast from "react-hot-toast";

import {
    generateSprint,
    saveGeneratedSprint,
} from "../api/aiApi";

import { getProjects } from "../api/projectApi";

function AI() {
    const navigate = useNavigate();

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

    const [result, setResult] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await getProjects();

            setProjects(response.data.projects || []);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load projects");
        }
    };

    const handleGenerate = async () => {
        if (!selectedProject) {
            toast.error("Please select a project.");
            return;
        }

        if (!prompt.trim()) {
            toast.error("Please enter project description.");
            return;
        }

        try {
            setLoading(true);

            const response = await generateSprint(
                prompt,
                selectedProject
            );

            setResult(response.data.sprint);

            toast.success("Sprint generated successfully!");

        } catch (error) {
            console.log(error);
            toast.error("Failed to generate sprint");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!result) return;

        try {
            setSaving(true);

            await saveGeneratedSprint(
                selectedProject,
                result
            );

            toast.success("Sprint created successfully!");

            setPrompt("");
            setResult(null);

            navigate(`/projects/${selectedProject}`);

        } catch (error) {
            console.log(error);

            toast.error("Failed to save sprint");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950">

            <Sidebar />

            <div className="ml-64 flex-1">

                <Navbar />

                <div className="mx-auto max-w-6xl p-10">

                    <div className="mb-10 text-center">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-600">

                            <Sparkles className="text-white" size={36} />

                        </div>

                        <h1 className="mt-6 text-4xl font-bold text-white">
                            AI Sprint Generator
                        </h1>

                        <p className="mt-3 text-lg text-slate-400">
                            Generate Agile sprints instantly using Gemini AI.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        <label className="mb-2 block text-white">
                            Select Project
                        </label>

                        <select
                            value={selectedProject}
                            onChange={(e) =>
                                setSelectedProject(e.target.value)
                            }
                            className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
                        >
                            <option value="">
                                Select Project
                            </option>

                            {projects.map((project) => (
                                <option
                                    key={project._id}
                                    value={project._id}
                                >
                                    {project.title}
                                </option>
                            ))}
                        </select>

                        <label className="mb-3 block text-white">
                            Project Description
                        </label>

                        <textarea
                            rows={8}
                            value={prompt}
                            onChange={(e) =>
                                setPrompt(e.target.value)
                            }
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-5 text-white outline-none focus:border-violet-500"
                            placeholder="Describe your software project..."
                        />

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
                        >
                            <Wand2 size={22} />

                            {loading
                                ? "Generating..."
                                : "Generate Sprint"}
                        </button>

                        {/* Generated Sprint */}
                        {result && (

                            <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-950 p-6">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h2 className="text-2xl font-bold text-white">
                                            {result.name}
                                        </h2>

                                        <p className="mt-2 text-slate-400">
                                            {result.goal}
                                        </p>

                                    </div>

                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
                                    >
                                        <Save size={20} />

                                        {saving ? "Saving..." : "Save Sprint"}
                                    </button>

                                </div>

                                <div className="mt-8 space-y-4">

                                    {result.tasks.map((task, index) => (

                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-violet-500"
                                        >

                                            <div className="flex items-center justify-between">

                                                <h3 className="font-semibold text-white">
                                                    {task.title}
                                                </h3>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium text-white ${task.priority === "High"
                                                            ? "bg-red-500"
                                                            : task.priority === "Medium"
                                                                ? "bg-amber-500"
                                                                : "bg-emerald-500"
                                                        }`}
                                                >
                                                    {task.priority}
                                                </span>

                                            </div>

                                            <p className="mt-3 text-sm text-slate-400">
                                                {task.description}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}

                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">

                        <div className="rounded-2xl bg-slate-900 p-6">

                            <h3 className="text-xl font-semibold text-white">
                                🚀 Sprint Planning
                            </h3>

                            <p className="mt-3 text-slate-400">
                                AI creates a complete Agile sprint roadmap in seconds.
                            </p>

                        </div>

                        <div className="rounded-2xl bg-slate-900 p-6">

                            <h3 className="text-xl font-semibold text-white">
                                📋 Task Breakdown
                            </h3>

                            <p className="mt-3 text-slate-400">
                                Automatically generates well-structured development tasks with priorities.
                            </p>

                        </div>

                        <div className="rounded-2xl bg-slate-900 p-6">

                            <h3 className="text-xl font-semibold text-white">
                                🤖 Gemini AI
                            </h3>

                            <p className="mt-3 text-slate-400">
                                Powered by Google's Gemini AI to accelerate Agile sprint planning.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AI;