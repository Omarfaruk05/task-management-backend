import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { ICow, ICowFilters } from "./cow.interface";
import { Cow } from "./cow.model";
import { cowSearchableFields } from "./cow.constant";
import { SortOrder } from "mongoose";

// creat cow service
const createCowService = async (cowData: ICow): Promise<ICow> => {
  const isExist = await User.findById(cowData.seller);
  if (!isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please give me seller id as seller."
    );
  }
  const result = await Cow.create(cowData);

  return result;
};

// get all cow service
const getAllCowsService = async (filters: ICowFilters): Promise<ICow[]> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (minPrice && !maxPrice) {
    andConditions.push({
      $and: [{ price: { $gte: Number(minPrice) } }],
    });
  }
  if (!minPrice && maxPrice) {
    andConditions.push({
      $and: [{ price: { $lte: Number(maxPrice) } }],
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({
      $and: [{ price: { $gte: Number(minPrice), $lte: Number(maxPrice) } }],
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Cow.find(whereConditions);

  return result;
};

// creat single cow service
const getSingleCowService = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Sorry, There is no cow with this id."
    );
  }

  return result;
};

// update cow service
const updateCowService = async (
  id: string,
  updatedData: Partial<ICow>,
  user: any
): Promise<ICow | null> => {
  const { _id } = user;
  const cow = await Cow.findOne({ _id: id, seller: _id });

  if (!cow) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Can't update the cow because this is not your cow."
    );
  }

  if (updatedData.seller) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You can't update cows seller id."
    );
  }

  const result = await Cow.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

  return result;
};

// delete cow service
const deleteCowService = async (
  id: string,
  user: any
): Promise<ICow | null> => {
  const { _id } = user;
  const cow = await Cow.findOne({ _id: id, seller: _id });

  if (!cow) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Can't delete the cow because this is not your cow."
    );
  }
  const result = await Cow.findByIdAndDelete(id);

  return result;
};

export const CowService = {
  createCowService,
  getAllCowsService,
  getSingleCowService,
  updateCowService,
  deleteCowService,
};
