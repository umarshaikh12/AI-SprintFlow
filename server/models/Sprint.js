import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Planning", "Active", "Completed"],
      default: "Planning",
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Sprint", sprintSchema);