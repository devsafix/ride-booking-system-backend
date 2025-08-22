import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  return {
    data: user,
  };
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if (userId !== decodedToken.id) {
    throw new AppError(401, "You are not authorized");
  }

  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is already blocked");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to block user");
  }

  return updatedUser;
};

const unblockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not blocked");
  }

  user.isBlocked = false;
  await user.save();

  return user;
};

const approveDriver = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (user.role !== "driver") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not a driver");
  }

  if (user.isApproved) {
    throw new AppError(httpStatus.BAD_REQUEST, "Driver is already approved");
  }

  user.isApproved = true;
  await user.save();

  return user;
};

const suspendDriver = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (user.role !== "driver") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not a driver");
  }

  if (!user.isApproved) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Driver is not approved and cannot be suspended"
    );
  }

  user.isApproved = false;
  await user.save();

  return user;
};

export const UserServices = {
  getAllUsers,
  getMe,
  updateUser,
  blockUser,
  unblockUser,
  approveDriver,
  suspendDriver,
};
