import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    dueDate: {
      type: Date,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
    },

    subtasks: [
      {
        title: {
          type: String,
          required: true,
        },

        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    storyPoints: {
      type: Number,
      default: 0,
    },

    estimatedHours: {
      type: Number,
      default: 0,
    },

    difficulty: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);