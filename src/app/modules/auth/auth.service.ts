import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  ILoginUser,
  ILoginUserResponse,
  IUser,
  IUserResponse,
} from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHalpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import catchAsync from "../../../shared/catchAsync";

const createUserService = async (payload: IUser): Promise<IUserResponse> => {
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

const loginUserService = async (
  loginData: ILoginUser
): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = loginData;

  const isUserExist = await User.findOne(
    { phoneNumber },
    { _id: 1, phoneNumber: 1, password: 1, role: 1 }
  ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect.");
  }

  //token generating
  const accessToken = jwtHelpers.createToken(
    { _id: isUserExist?._id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id: isUserExist?._id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  createUserService,
  loginUserService,
};
