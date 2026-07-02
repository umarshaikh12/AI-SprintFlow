import Task from "../models/Task.js";
import Sprint from "../models/Sprint.js";
import catchAsync from "../utils/catchAsync.js";

// Create Sprint
export const createSprint = catchAsync(async (req, res) => {

  const sprint = await Sprint.create(req.body);

  res.status(201).json({
    success: true,
    message: "Sprint created successfully",
    sprint,
  });

});

// Get Sprints by Project
export const getSprintsByProject = catchAsync(async (req, res) => {

  const sprints = await Sprint.find({
    project: req.params.projectId,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    sprints,
  });

});

// Update Sprint
export const updateSprint = catchAsync(async (req, res) => {

  const sprint = await Sprint.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!sprint) {
    const error = new Error("Sprint not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    sprint,
  });

});

// Delete Sprint
export const deleteSprint = catchAsync(async (req, res) => {

  const sprint = await Sprint.findByIdAndDelete(req.params.id);

  if (!sprint) {
    const error = new Error("Sprint not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Sprint deleted successfully",
  });

});

// Start Sprint
export const startSprint = catchAsync(async (req, res) => {

  const sprint = await Sprint.findById(req.params.id);

  if (!sprint) {
    const error = new Error("Sprint not found");
    error.statusCode = 404;
    throw error;
  }

  const activeSprint = await Sprint.findOne({
    project: sprint.project,
    status: "Active",
  });

  if (activeSprint) {
    const error = new Error("Another sprint is already active.");
    error.statusCode = 400;
    throw error;
  }

  sprint.status = "Active";

  await sprint.save();

  res.status(200).json({
    success: true,
    message: "Sprint started successfully",
    sprint,
  });

});

// Complete Sprint
export const completeSprint = catchAsync(async (req, res) => {

  const sprint = await Sprint.findById(req.params.id);

  if (!sprint) {
    const error = new Error("Sprint not found");
    error.statusCode = 404;
    throw error;
  }

  sprint.status = "Completed";

  await sprint.save();

  res.status(200).json({
    success: true,
    message: "Sprint completed successfully",
    sprint,
  });

});

// Get Active Sprint
export const getActiveSprint = catchAsync(async (req, res) => {

  const sprint = await Sprint.findOne({
    status: "Active",
  }).populate("project", "title");

  if (!sprint) {
    return res.status(200).json({
      success: true,
      sprint: null,
    });
  }

  const tasks = await Task.find({
    project: sprint.project._id,
  });

  const completed = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  res.status(200).json({
    success: true,
    sprint: {
      ...sprint.toObject(),
      progress,
      totalTasks: tasks.length,
      completedTasks: completed,
    },
  });

});