import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/projects`,
});

export const getProjects = () => API.get("/");

export const createProject = (data) => API.post("/", data);

export const updateProject = (id, data) =>
  API.put(`/${id}`, data);

export const deleteProject = (id) =>
  API.delete(`/${id}`);

export const getProjectById = (id) =>
  API.get(`/${id}`);