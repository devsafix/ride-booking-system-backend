import AppError from "../../errorHelpers/AppError";
import { User } from "./user.model";
import httpStatus from "http-status-codes";

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is already blocked");
  }

  user.isBlocked = true;
  await user.save();

  return user;
};

export const UserServices = { getAllUsers, blockUser };
