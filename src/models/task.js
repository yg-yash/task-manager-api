const mongoose = require("mongoose");

//model for tasks
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true }
);

//creating a User database model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
