import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/ai`,
});

// Generate AI Sprint
export const generateSprint = (prompt, projectId) =>
  API.post("/generate", {
    prompt,
    projectId,
  });

// Save AI Sprint
export const saveGeneratedSprint = (projectId, sprint) =>
  API.post("/save", {
    projectId,
    sprint,
  });

export const generateSubtasks = (taskId) =>
  API.post("/subtasks", {
    taskId,
  });

export const estimateTaskEffort = (taskId) =>
  API.post("/estimate", {
    taskId,
  });

export const generateSprintSummary = (sprintId) =>
  API.post("/summary", {
    sprintId,
  });