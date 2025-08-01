import { UserRole } from "../../constants/role";

export interface IUser {
  name: string;
  email: string;
  password: string | undefined;
  role: UserRole;
  isBlocked: boolean;
  isApproved?: boolean;
  isAvailable?: boolean;
  averageRating?: number;
  totalRatings?: number;
}
