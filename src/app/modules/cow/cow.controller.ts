import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CowService } from "./cow.service";
import ApiError from "../../../errors/ApiError";
import { ICow } from "./cow.interface";
import { cowFilterableFields } from "./cow.constant";
import pick from "../../../shared/pick";

// creat cow controller
const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;

  const result = await CowService.createCowService(cowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow created successfully.",
    data: result,
  });
});

// get all cow controller
const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);

  const result = await CowService.getAllCowsService(filters);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cows received successfully.",

    data: result,
  });
});

// get single cow controller
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.getSingleCowService(id);

  if (!result) {
    throw new ApiError(httpStatus.OK, "No cow found with this id");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow received successfully.",
    data: result,
  });
});

// update cow controller
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const user = req.user;
  const result = await CowService.updateCowService(id, updatedData, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow updated successfully.",
    data: result,
  });
});

// delete cow controller
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const result = await CowService.deleteCowService(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow deleted successfully.",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
