import Sprint from "../models/Sprint.js";
import Task from "../models/Task.js";
import ai from "../config/gemini.js";
import catchAsync from "../utils/catchAsync.js";
import handleGeminiError from "../utils/handleGeminiError.js";

export const generateSprint = catchAsync(async (req, res) => {

  const { prompt, projectId } = req.body;

  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an experienced Agile Scrum Master.

Generate ONE software development sprint.

Return ONLY raw JSON.

DO NOT use markdown.
DO NOT wrap the response inside \`\`\`json.
DO NOT explain anything.
ONLY return a valid JSON object.

Format:

{
  "name": "",
  "goal": "",
  "tasks": [
    {
      "title": "",
      "description": "",
      "priority": "High"
    }
  ]
}

Project Description:

${prompt}
`,
    });

    const text = response.text;

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const sprint = JSON.parse(cleanText);

    res.status(200).json({
      success: true,
      sprint,
    });

  } catch (error) {

    const geminiError = handleGeminiError(error);

    return res.status(geminiError.status).json({
      success: false,
      message: geminiError.message,
    });

  }

});

export const saveGeneratedSprint = async (req, res) => {
  try {
    const { projectId, sprint } = req.body;

    if (!projectId || !sprint) {
      return res.status(400).json({
        success: false,
        message: "Project ID and Sprint data are required.",
      });
    }

    // Today's date
    const startDate = new Date();

    // Sprint ends after 14 days
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 14);

    // Create Sprint
    const createdSprint = await Sprint.create({
      name: sprint.name,
      goal: sprint.goal,
      startDate,
      endDate,
      status: "Planning",
      project: projectId,
    });

    // Create Tasks
    const taskData = sprint.tasks.map((task) => ({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: "Todo",
      project: projectId,
      sprint: createdSprint._id,
    }));

    await Task.insertMany(taskData);

    res.status(201).json({
      success: true,
      message: "AI Sprint created successfully!",
      sprint: createdSprint,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generateSubtasks = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an Agile Scrum Master.

Generate 6-8 development subtasks.

Return ONLY valid JSON.

Format:

{
  "subtasks":[
    {
      "title":""
    }
  ]
}

Task:
${task.title}

Description:
${task.description}
`,
    });

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(text);

    task.subtasks = result.subtasks.map((subtask) => ({
      title: subtask.title,
      completed: false,
    }));

    await task.save();

    res.status(200).json({
      success: true,
      message: "Subtasks generated successfully.",
      subtasks: task.subtasks,
    });

  } catch (error) {

    const geminiError = handleGeminiError(error);

    return res.status(geminiError.status).json({
      success: false,
      message: geminiError.message,
    });

  }
};

export const estimateTaskEffort = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an Agile Scrum Master.

Estimate the effort for the following task.

Return ONLY valid JSON.

Format:

{
  "difficulty":"Easy | Medium | Hard",
  "storyPoints":5,
  "estimatedHours":8
}

Task:
${task.title}

Description:
${task.description}
`,
    });

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(text);

    task.difficulty = result.difficulty;
    task.storyPoints = result.storyPoints;
    task.estimatedHours = result.estimatedHours;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task effort estimated successfully.",
      task,
    });

  } catch (error) {

    const geminiError = handleGeminiError(error);

    return res.status(geminiError.status).json({
      success: false,
      message: geminiError.message,
    });

  }
};

export const summarizeSprint = async (req, res) => {
  try {
    const { sprintId } = req.body;

    if (!sprintId) {
      return res.status(400).json({
        success: false,
        message: "Sprint ID is required.",
      });
    }

    const sprint = await Sprint.findById(sprintId);

    if (!sprint) {
      return res.status(404).json({
        success: false,
        message: "Sprint not found.",
      });
    }

    const tasks = await Task.find({
      sprint: sprintId,
    });

    const completed = tasks.filter(
      (task) => task.status === "Done"
    ).length;

    const pending = tasks.length - completed;

    const completion =
      tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an Agile Scrum Master.

Write a short sprint summary.

Return ONLY plain text.

Sprint Goal:
${sprint.goal}

Completed Tasks:
${completed}

Pending Tasks:
${pending}

Completion:
${completion}%
`,
    });

    sprint.summary = response.text;

    await sprint.save();

    res.status(200).json({
      success: true,
      summary: sprint.summary,
    });

  } catch (error) {

    const geminiError = handleGeminiError(error);

    return res.status(geminiError.status).json({
      success: false,
      message: geminiError.message,
    });

  }
};