import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const updateAvailabilityStatus = async (
  driverId: string,
  isAvailable: boolean
) => {
  const driver = await User.findById(driverId);

  // Check if user exists and is a driver
  if (!driver || driver.role !== "driver") {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  // A suspended driver cannot be available
  if (!driver.isApproved && isAvailable) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Suspended drivers cannot be set as available"
    );
  }

  // Update the availability status
  driver.isAvailable = isAvailable;
  await driver.save();

  return driver;
};


export const DriverServices = {
  updateAvailabilityStatus,
};
