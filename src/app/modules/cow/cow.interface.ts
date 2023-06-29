import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type ILocation =
  | "Dhaka"
  | " Chattogram"
  | "Barishal"
  | "  Rajshahi"
  | "  Sylhet"
  | "  Comilla"
  | "   Rangpur"
  | "  Mymensingh";

export type IBreed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "  Gir"
  | "Indigenous"
  | "Tharparkar"
  | " Kankrej";

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ILocation;
  breed: IBreed;
  weight: number;
  label: "for sale" | "sold out";
  category: "Dairy" | "Beef" | "DualPurpose";
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  breed?: string;
  price?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
