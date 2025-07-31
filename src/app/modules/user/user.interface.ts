import { UserRole } from "../../constants/role";

export interface IUser {
  _id?: string
  name: string;
  email: string;
  password: string | undefined;
  role: UserRole;
  isBlocked: boolean;
  isApproved?: boolean;
  isAvailable?: boolean;
}
