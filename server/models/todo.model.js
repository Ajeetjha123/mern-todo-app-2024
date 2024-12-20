import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
  },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
