import { UserRole } from "../../constants/role";

export interface IUser {
  name: string;
  email: string;
  password: string | undefined;
  role: UserRole;
  contactNo?: string;
  vehicleType?: string;
  isBlocked: boolean;
  isApproved?: boolean;
  isAvailable?: boolean;
  averageRating?: number;
  totalRatings?: number;
  emergencyContacts?: {
    name: string;
    phone?: string;
    email?: string;
  }[];
}
