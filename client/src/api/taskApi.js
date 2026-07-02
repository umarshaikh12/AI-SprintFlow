import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/tasks`,
});

export const getAllTasks = () =>
  API.get("/");

export const createTask = (data) =>
  API.post("/", data);

export const getTasksByProject = (projectId) =>
  API.get(`/${projectId}`);

export const updateTask = (id, data) =>
  API.put(`/${id}`, data);

export const updateTaskStatus = (id, status) =>
  API.patch(`/${id}/status`, { status });

export const deleteTask = (id) =>
  API.delete(`/${id}`);