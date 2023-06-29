import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;

  const result = await OrderService.createOrderService(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully.",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrderService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All orders received successfully.",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
