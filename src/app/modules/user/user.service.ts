import { IUser } from "./user.interface";
import { User } from "./user.model";

const getAllUserService = async (): Promise<IUser[] | null> => {
  const result = await User.find();

  return result;
};

const getSingleUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};

const updateUserService = async (
  id: string,
  updatedData: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

  return result;
};

const deleteUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

export const UserService = {
  getAllUserService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
};
