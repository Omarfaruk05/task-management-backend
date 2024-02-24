import { Model, StringSchemaDefinition } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
};

export type IUserResponse = {
  phoneNumber: string;
  role: "seller" | "buyer";
  password?: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IVerifiedUser = {
  _id: string;
  role: String;
  iat?: number;
  exp?: number;
};
