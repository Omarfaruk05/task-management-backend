import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin, ILoginAdminResponse } from "./admin.interfece";
import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import config from "../../../config";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AdminService.createAdminService(userData);

  result.password = undefined;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully.",
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...longinData } = req.body;

  const result = await AdminService.loginAdminService(longinData);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginAdminResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your login is successfull.",
    data: others,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
};
