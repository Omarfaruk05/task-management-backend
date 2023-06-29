import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import ApiError from "../../../errors/ApiError";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUserService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users received successfully.",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUserService(id);

  if (!result) {
    throw new ApiError(httpStatus.OK, "No user found with this id");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User received successfully.",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await UserService.updateUserService(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully.",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUserService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully.",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
