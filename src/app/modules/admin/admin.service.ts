import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  IAdmin,
  IAdminResponse,
  ILoginAdmin,
  ILoginAdminResponse,
} from "./admin.interfece";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/jwtHalpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import bcrypt from "bcrypt";

const createAdminService = async (payload: IAdmin): Promise<IAdminResponse> => {
  const isExist = await Admin.findOne({ phoneNumber: payload.phoneNumber });
  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Your phone number is already used."
    );
  }
  const result = await Admin.create(payload);
  return result;
};

const loginAdminService = async (
  loginData: ILoginAdmin
): Promise<ILoginAdminResponse> => {
  const { phoneNumber, password } = loginData;

  const isAdminExist = await Admin.findOne(
    { phoneNumber },
    { _id: 1, phoneNumber: 1, password: 1, role: 1 }
  ).lean();
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist.");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isAdminExist.password
  );
  if (isAdminExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect.");
  }

  //token generating
  const accessToken = jwtHelpers.createToken(
    { _id: isAdminExist?._id, role: isAdminExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id: isAdminExist?._id, role: isAdminExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdminService,
  loginAdminService,
};
