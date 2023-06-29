import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CowService } from "./cow.service";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pic";
import { paginationFields } from "../../constants/paginationConstants";
import { ICow } from "./cow.interface";
import { cowFilterableFields } from "./cow.constant";

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

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCowsService(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cows received successfully.",
    meta: result.meta,
    data: result.data,
  });
});

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

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await CowService.updateCowService(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow updated successfully.",
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.deleteCowService(id);

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
