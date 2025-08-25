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
      "Your are not approve or suspended by admin, please contact admin"
    );
  }

  // Update the availability status
  driver.isAvailable = isAvailable;
  await driver.save();

  return driver;
};

const getEarningsHistory = async (driverId: string) => {
  const completedRides = await Ride.find({
    driver: driverId,
    status: RideStatus.COMPLETED,
  }).populate("rider", "name");

  if (!completedRides || completedRides.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No earnings history found for this driver"
    );
  }

  const totalEarnings = completedRides.reduce(
    (sum, ride) => sum + (ride.fare || 0),
    0
  );

  const earningsHistory = completedRides.map((ride) => ({
    rideId: ride._id,
    fare: ride.fare,
    pickupLocation: ride.pickupLocation,
    dropOffLocation: ride.dropOffLocation,
    date: ride.createdAt,
  }));

  return {
    totalEarnings,
    history: earningsHistory,
  };
};

export const DriverServices = {
  updateAvailabilityStatus,
  getEarningsHistory,
};
