import { User } from "./user.model";

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const UserServices = { getAllUsers };
