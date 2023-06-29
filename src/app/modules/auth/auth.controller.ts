import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.createUserService(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created successfully.",
    data: result,
  });
});

export const AuthController = {
  createUser,
};
