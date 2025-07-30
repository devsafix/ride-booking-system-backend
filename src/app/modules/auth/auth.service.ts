import { envVariables } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { BcryptHelper } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser)
    throw new AppError(httpStatus.BAD_REQUEST, "Email already exists");

  const user = new User(payload);
  await user.save();

  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || user.isBlocked) throw new Error("User not found or blocked");

  const isPasswordValid = await BcryptHelper.comparePassword(
    password,
    user.password
  );
  if (!isPasswordValid)
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid password");

  const accessToken = generateToken(
    { id: user._id, role: user.role },
    envVariables.JWT_ACCESS_SECRET,
    envVariables.JWT_ACCESS_EXPIRES
  );

  return { accessToken, user };
};

export const AuthServices = { registerUser, loginUser };
