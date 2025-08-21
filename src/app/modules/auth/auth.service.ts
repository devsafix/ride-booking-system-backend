import { Response } from "express";
import { envVariables } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { BcryptHelper } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
import { setAuthCookie } from "../../utils/setCookie";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already exists");
  }

  const user = new User(payload);
  await user.save();

  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };
};

const loginUser = async (res: Response, email: string, password: string) => {
  // Explicitly select the password field for this query only
  const user = await User.findOne({ email }).select("+password");

  if (!user || user.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found or blocked");
  }

  const isPasswordValid = await BcryptHelper.comparePassword(
    password,
    user.password as string
  );

  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  const accessToken = generateToken(
    { id: user._id, role: user.role },
    envVariables.JWT_ACCESS_SECRET,
    envVariables.JWT_ACCESS_EXPIRES
  );

  setAuthCookie(res, accessToken);

  // Return the user object without the password
  user.password = undefined;

  return { accessToken, user };
};

export const AuthServices = { registerUser, loginUser };
