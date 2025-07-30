/* eslint-disable no-console */
import bcryptjs from "bcryptjs";
import { IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { envVariables } from "../config/env";
import { userRoles } from "../constants/role";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVariables.ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      envVariables.ADMIN_PASSWORD,
      Number(envVariables.BCRYPT_SALT_ROUND)
    );

    const payload: IUser = {
      name: "Admin",
      role: userRoles.ADMIN,
      email: envVariables.ADMIN_EMAIL,
      password: hashedPassword,
      isBlocked: false,
    };

    const superAdmin = await User.create(payload);
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
