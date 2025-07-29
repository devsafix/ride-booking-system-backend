import { UserRole } from "../../../constants/role";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked: boolean;
  isApproved?: boolean;
  isAvailable?: boolean;
}
