import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createUserService = async (payload: IUser): Promise<IUser> => {
  if (payload.role === "buyer") {
    payload.income = 0;
    if (!payload.budget) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "As a buyer you have to budget."
      );
    }
  }
  if (payload.role === "seller") {
    payload.budget = 0;
    payload.income = 0;
  }
  const isExist = await User.findOne({ phoneNumber: payload.phoneNumber });
  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Your phone number is already used."
    );
  }
  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  createUserService,
};
