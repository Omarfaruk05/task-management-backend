import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";
import { Cow } from "../cow/cow.model";

const createOrderService = async (
  orderData: IOrder,
  user: any
): Promise<IOrder> => {
  const session = await mongoose.startSession();

  //checking given buyer id is correct
  if (orderData.buyer !== user._id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This is not your id");
  }

  //cheking available cow with cow id
  const avalibaleCow = await Cow.findById(orderData.cow);

  if (!avalibaleCow || avalibaleCow.label === "sold out") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This cow is not found or sold out."
    );
  }

  // checking user is buyer
  const isBuyer = await User.findById(orderData.buyer);

  if (isBuyer && isBuyer.budget <= avalibaleCow.price) {
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

const getAllOrderService = async (user: any): Promise<IOrder[] | null> => {
  let findData = {};
  if (user.role === "buyer") {
    findData = { buyer: user._id };
  } else if (user.role === "seller") {
    console.log("seller");

    const result = await Order.find(findData).populate({
      path: "cow",
      match: { seller: user._id },
    });
    console.log(result);
    const filteredOrders = result.filter((order) => order.cow !== null);
    return filteredOrders;
  } else if (user.role === "admin") {
    findData = {};
  }

  const result = await Order.find(findData).populate("cow");

  return result;
};

const getSingleOrderService = async (
  id: string,
  user: any
): Promise<IOrder | null> => {
  let findData = null;
  if (user.role === "buyer") {
    findData = { buyer: user._id };
  } else if (user.role === "seller") {
    console.log("seller");

    const result = await Order.findOne({
      _id: id,
    })
      .populate({
        path: "cow",
        match: { seller: user._id },
        populate: {
          path: "seller",
        },
      })
      .populate("buyer");

    if (!result) {
      throw new ApiError(httpStatus.FORBIDDEN, "There is no order in this id.");
    }

    return result;
  } else if (user.role === "admin") {
    findData = null;
  }

  const result = await Order.findOne({ _id: id, findData })
    .populate({
      path: "cow",
      populate: {
        path: "seller",
      },
    })
    .populate("buyer");

  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, "There is no order in this id.");
  }

  return result;
};

export const OrderService = {
  createOrderService,
  getAllOrderService,
  getSingleOrderService,
};
