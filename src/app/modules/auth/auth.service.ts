import { envVariables } from "../../config/env";
import { BcryptHelper } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
import { User } from "../user/user.model";

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) throw new Error("Email already exists");

  const user = new User(payload);
  await user.save();

  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };
};


export const AuthServices = { registerUser };
