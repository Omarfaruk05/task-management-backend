import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import { TaskService } from "./task.service";
import { ITask } from "./task.interface";
import { taskFilterableFields } from "./task.constant";

// creat task controller
const createTask = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await TaskService.createTaskService(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tasks created successfully.",
    data: result,
  });
});

// get all tasks controller
const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, taskFilterableFields);

  const result = await TaskService.getAllTasksService(filters);

  sendResponse<ITask[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tasks received successfully.",

    data: result,
  });
});

// get single task controller
const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TaskService.getSingleTaskService(id);

  if (!result) {
    throw new ApiError(httpStatus.OK, "No task found with this id");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task received successfully.",
    data: result,
  });
});

// update task controller
const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log(updatedData);
  const user = req.user;
  const result = await TaskService.updateTaskService(id, updatedData, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task updated successfully.",
    data: result,
  });
});

// delete task controller
const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const result = await TaskService.deleteTaskService(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task deleted successfully.",
    data: result,
  });
});

export const TaskController = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
