import Project from "../models/Project.js";
import catchAsync from "../utils/catchAsync.js";

export const createProject = catchAsync(async (req, res) => {

  const { title, description } = req.body;

  const project = await Project.create({
    title,
    description,
    status: "Active",
  });

  res.status(201).json({
    success: true,
    message: "Project Created Successfully",
    project,
  });

});

export const getProjects = catchAsync(async (req, res) => {

  const projects = await Project.find();

  res.status(200).json({
    success: true,
    projects,
  });

});

export const updateProject = catchAsync(async (req, res) => {

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Project Updated Successfully",
    project,
  });

});

export const deleteProject = catchAsync(async (req, res) => {

  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Project Deleted Successfully",
  });

});

export const getProjectById = catchAsync(async (req, res) => {

  const project = await Project.findById(req.params.id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    project,
  });

});