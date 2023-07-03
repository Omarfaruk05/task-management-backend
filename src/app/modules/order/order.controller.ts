import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;
  const user = req.user;

  const result = await OrderService.createOrderService(orderData, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully.",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await OrderService.getAllOrderService(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All orders received successfully.",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  const result = await OrderService.getSingleOrderService(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order received successfully.",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
