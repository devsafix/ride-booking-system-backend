/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ride } from "./ride.model";
import { IRide, RideStatus } from "./ride.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Types } from "mongoose";
import { calculateFare } from "../../utils/calculateFare";

const createRide = async (rideData: IRide) => {
  const ride = await Ride.create(rideData);
  return ride;
};

const getMyRides = async (userId: string, role: string) => {
  const filter: any = {};
  if (role === "rider") filter.rider = userId;
  else if (role === "driver") filter.driver = userId;

  const rides = await Ride.find(filter).populate("rider").populate("driver");
  return rides;
};

const updateRideStatus = async (
  rideId: string,
  status: RideStatus,
  driverId?: string
) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(httpStatus.NOT_FOUND, "Ride not found");

  // If driver is trying to update a ride, validate it's theirs
  if (driverId && ride.driver?.toString() !== driverId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  ride.status = status;

  if (status === "completed") {
    ride.fare = calculateFare();
  }

  await ride.save();
  return ride;
};

const assignDriverToRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(httpStatus.NOT_FOUND, "Ride not found");

  if (ride.status !== "requested") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Ride already accepted or cancelled"
    );
  }

  ride.driver = new Types.ObjectId(driverId);
  ride.status = "accepted" as RideStatus;

  await ride.save();
  return ride;
};

const cancelRide = async (rideId: string, riderId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new AppError(httpStatus.NOT_FOUND, "Ride not found");

  if (ride.rider?.toString() !== riderId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  if (ride.status !== "requested") {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot cancel at this stage");
  }

  ride.status = "cancelled" as RideStatus;
  await ride.save();

  return ride;
};

export const RideServices = {
  createRide,
  getMyRides,
  updateRideStatus,
  assignDriverToRide,
  cancelRide,
};
