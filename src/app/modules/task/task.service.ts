import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { SortOrder } from "mongoose";
import { ITask, ITaskFilters } from "./task.interface";
import { Task } from "./task.model";
import { taskSearchableFields } from "./task.constant";

// creat task service
const createTaskService = async (data: ITask): Promise<ITask> => {
  const result = await Task.create(data);

  return result;
};

// get all task service
const getAllTasksService = async (filters: ITaskFilters): Promise<ITask[]> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: taskSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Task.find(whereConditions);

  return result;
};

// creat single task service
const getSingleTaskService = async (id: string): Promise<ITask | null> => {
  const result = await Task.findById(id).populate("user");
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Sorry, There is no task with this id."
    );
  }

  return result;
};

// update task service
const updateTaskService = async (
  id: string,
  updatedData: Partial<ITask>,
  user: any
): Promise<ITask | null> => {
  const { _id } = user;
  const task = await Task.findOne({ _id: id, user: _id });

  if (!task) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Can't update the task because this is not task task."
    );
  }
  const filter = { _id: id };
  const result = await Task.findOneAndUpdate(filter, updatedData, {
    new: true,
  });
  return result;
};

// delete task service
const deleteTaskService = async (
  id: string,
  user: any
): Promise<ITask | null> => {
  const { _id } = user;
  const task = await Task.findOne({ _id: id, user: _id });

  if (!task) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Can't delete the task because this is not your task."
    );
  }
  const result = await Task.findByIdAndDelete(id);

  return result;
};

export const TaskService = {
  createTaskService,
  getAllTasksService,
  getSingleTaskService,
  updateTaskService,
  deleteTaskService,
};
