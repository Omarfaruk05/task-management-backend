import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config";
import { ITask, TaskModel } from "./task.interface";

const taskSchema = new Schema<ITask, TaskModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    dueDate: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Task = model<ITask, TaskModel>("Task", taskSchema);
