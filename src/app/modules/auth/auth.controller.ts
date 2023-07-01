import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  ILoginUserResponse,
  IUser,
  IUserResponse,
} from "../user/user.interface";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import config from "../../../config";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.createUserService(userData);
  result.password = undefined;

  sendResponse<IUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created successfully.",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.loginUserService(userData);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successful.",
    data: others,
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
