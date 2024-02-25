import { Model, StringSchemaDefinition } from "mongoose";

export type IUser = {
  name: string;
  role: "user" | "admin";
  email: string;
  password: string;
  address: string;
};

export type IUserResponse = {
  name: string;
  email: string;
  role: "user" | "admin";
  password?: string;
  address: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type ILoginUser = {
  email: string;
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
