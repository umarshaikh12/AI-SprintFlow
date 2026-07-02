import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/sprints`,
});

// Create Sprint
export const createSprint = (data) =>
  API.post("/", data);

// Get Project Sprints
export const getSprintsByProject = (projectId) =>
  API.get(`/${projectId}`);

// Update Sprint
export const updateSprint = (id, data) =>
  API.put(`/${id}`, data);

// Delete Sprint
export const deleteSprint = (id) =>
  API.delete(`/${id}`);

// Start Sprint
export const startSprint = (id) =>
  API.patch(`/${id}/start`);

// Complete Sprint
export const completeSprint = (id) =>
  API.patch(`/${id}/complete`);

// Get Active Sprint
export const getActiveSprint = () =>
  API.get("/active/current");