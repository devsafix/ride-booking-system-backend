// src/app/modules/admin/admin.service.ts
import { Ride } from "../ride/ride.model";
import { RideStatus } from "../ride/ride.interface";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";

const generateRideReport = async () => {
  const allRides = await Ride.find({})
    .populate("rider", "-password")
    .populate("driver", "-password");

  if (!allRides || allRides.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No rides found to generate a report"
    );
  }

  const totalRides = allRides.length;
  const completedRides = allRides.filter(
    (ride) => ride.status === RideStatus.COMPLETED
  ).length;
  const cancelledRides = allRides.filter(
    (ride) => ride.status === RideStatus.CANCELLED
  ).length;
  const totalEarnings = allRides.reduce((sum, ride) => {
    // Only sum the fare for completed rides
    if (ride.status === RideStatus.COMPLETED && ride.fare) {
      return sum + ride.fare;
    }
    return sum;
  }, 0);

  return {
    overview: {
      totalRides,
      completedRides,
      cancelledRides,
      pendingRides: totalRides - (completedRides + cancelledRides),
      totalEarnings,
    },
    detailedRides: allRides,
  };
};

export const AdminServices = {
  generateRideReport,
};
