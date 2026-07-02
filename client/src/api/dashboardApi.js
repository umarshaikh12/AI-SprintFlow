import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/dashboard`,
});

export const getDashboardStats = () =>
  API.get("/");

export const getRecentProjects = () =>
  API.get("/recent-projects");