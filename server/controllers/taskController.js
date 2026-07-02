import Task from "../models/Task.js";
import catchAsync from "../utils/catchAsync.js";

export const createTask = catchAsync(async (req, res) => {

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });

});

export const getTasksByProject = catchAsync(async (req, res) => {

  const tasks = await Task.find({
    project: req.params.projectId,
  });

  res.status(200).json({
    success: true,
    tasks,
  });

});

export const updateTask = catchAsync(async (req, res) => {

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    task,
  });

});

export const deleteTask = catchAsync(async (req, res) => {

  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });

});

export const updateTaskStatus = catchAsync(async (req, res) => {

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    task,
  });

});

export const getAllTasks = catchAsync(async (req, res) => {

  const tasks = await Task.find()
    .populate("project", "title")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    tasks,
  });

});