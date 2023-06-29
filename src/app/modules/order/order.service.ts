import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";
import { Cow } from "../cow/cow.model";

const createOrderService = async (orderData: IOrder): Promise<IOrder> => {
  const session = await mongoose.startSession();

  const isBuyer = await User.findById(orderData.buyer);
  if (!isBuyer) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please give me buyer id to buy."
    );
  }
  const avalibaleCow = await Cow.findById(orderData.cow);
  if (!avalibaleCow || avalibaleCow.label === "sold out") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This cow is not found or sold out."
    );
  }

  if (isBuyer.budget <= avalibaleCow.price) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You need more money to byt this cow."
    );
  }

  let newOrderData = null;
  try {
    session.startTransaction();

    await Cow.updateOne(
      { _id: orderData.cow },
      { $set: { label: "sold out" } },
      { session }
    );

    await User.updateOne(
      { _id: orderData.buyer },
      { $inc: { budget: -avalibaleCow.price } },
      { session }
    );
    await User.updateOne(
      { _id: avalibaleCow.seller },
      { $inc: { income: avalibaleCow.price } },
      { session }
    );

    const newOrder = await Order.create([orderData], { session });
    if (!newOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Faild to create order.");
    }

    newOrderData = newOrder[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
  return newOrderData;
};

const getAllOrderService = async (): Promise<IOrder[] | null> => {
  const result = await Order.find();

  return result;
};

export const OrderService = {
  createOrderService,
  getAllOrderService,
};
