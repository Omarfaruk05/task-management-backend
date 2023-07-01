import { Model } from "mongoose";

export type AdminName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  phoneNumber: string;
  role: "admin";
  password: string;
  name: AdminName;
  address: string;
};
export type IAdminResponse = {
  password?: string;
  phoneNumber: string;
  role: "admin";
  name: AdminName;
  address: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
