import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type ITask = {
  title: string;
  description: string;
  status: "pending" | "complete";
  dueDate: string;
  user: Types.ObjectId | IUser;
};

export type TaskModel = Model<ITask, Record<string, unknown>>;

export type ITaskFilters = {
  searchTerm?: string;
  title?: string;
  description?: string;
  dueDate?: string;
};
