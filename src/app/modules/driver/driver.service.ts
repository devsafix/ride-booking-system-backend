import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Ride } from "../ride/ride.model";
import { RideStatus } from "../ride/ride.interface";

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

const getEarningsHistory = async (driverId: string) => {
  const earnings = await Ride.find({
    driver: driverId,
    status: RideStatus.COMPLETED,
  }).populate("rider");

  if (!earnings) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No earnings history found for this driver"
    );
  }

  return earnings;
};

export const DriverServices = {
  updateAvailabilityStatus,
  getEarningsHistory,
};
