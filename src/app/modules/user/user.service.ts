import { IUser, IUserResponse } from "./user.interface";
import { User } from "./user.model";

const getAllUserService = async (): Promise<IUserResponse[] | null> => {
  const result = await User.find({}, { password: 0 });

  return result;
};

const getSingleUserService = async (
  id: string
): Promise<IUserResponse | null> => {
  const result = await User.findById(id, { password: 0 });

  return result;
};

const updateUserService = async (
  id: string,
  updatedData: Partial<IUser>
): Promise<IUserResponse | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

  return result;
};

const deleteUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

const getMyProfileService = async (
  user: any
): Promise<IUserResponse | null> => {
  const result = await User.findById(user._id, { password: 0 });

  return result;
};
const updateMyProfileService = async (
  user: any,
  updatedData: Partial<IUser>
): Promise<IUserResponse | null> => {
  const result = await User.findOneAndUpdate({ _id: user._id }, updatedData, {
    new: true,
  });
  return result;
};

export const UserService = {
  getAllUserService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
  getMyProfileService,
  updateMyProfileService,
};
