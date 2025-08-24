/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ride } from "./ride.model";
import { IRide, RideStatus } from "./ride.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import { calculateFare } from "../../utils/calculateFare";

// An array of active statuses for a ride
const activeRideStatuses = [
  RideStatus.REQUESTED,
  RideStatus.ACCEPTED,
  RideStatus.PICKED_UP,
  RideStatus.IN_TRANSIT,
];

const requestRide = async (riderId: string, rideData: Partial<IRide>) => {
  // 1. Check if rider already has an active ride
  const existingActiveRide = await Ride.findOne({
    rider: riderId,
    status: { $in: activeRideStatuses },
  });
  if (existingActiveRide) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You already have an active ride request"
    );
  }

  // 2. Create the new ride with the rider and location data
  const ride = await Ride.create({
    ...rideData,
    rider: riderId,
    status: RideStatus.REQUESTED,
  });
  return ride;
};

const getMyRides = async (userId: string, role: string, query: any) => {
  const filter: any = {};

  // Apply role-based filtering
  if (role === "rider") {
    filter.rider = userId;
  } else if (role === "driver") {
    filter.driver = userId;
  }
  // Admins can see all, so no filter needed for admin role

  // Apply status filter
  if (query.status) {
    filter.status = query.status;
  }

  // Apply fare range filter
  if (query.minFare || query.maxFare) {
    filter.fare = {};
    if (query.minFare) {
      filter.fare.$gte = Number(query.minFare);
    }
    if (query.maxFare) {
      filter.fare.$lte = Number(query.maxFare);
    }
  }

  // Apply date range filter
  if (query.startDate || query.endDate) {
    filter.createdAt = {};
    if (query.startDate) {
      filter.createdAt.$gte = new Date(query.startDate);
    }
    if (query.endDate) {
      filter.createdAt.$lte = new Date(query.endDate);
    }
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Ride.countDocuments(filter);
  const rides = await Ride.find(filter)
    .populate("rider")
    .populate("driver")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: rides,
  };
};

const getRideById = async (rideId: string) => {
  const ride = await Ride.findById(rideId).populate("rider").populate("driver");
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }
  return ride;
};

const getPendingRides = async () => {
  const rides = await Ride.find({ status: RideStatus.REQUESTED }).populate(
    "rider"
  );
  return rides;
};

const getActiveRides = async () => {
  const rides = await Ride.find({
    status: {
      $nin: [RideStatus.REQUESTED, RideStatus.REJECTED, RideStatus.COMPLETED],
    },
  }).populate("rider");
  return rides;
};

const acceptRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  // Check if the ride has already been accepted or is no longer requested
  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppError(httpStatus.BAD_REQUEST, "Ride is no longer available");
  }

  // Check if the driver is eligible (approved and online)
  const driver = await User.findById(driverId);

  if (!driver || !driver.isApproved) {
    throw new AppError(httpStatus.FORBIDDEN, "Driver is not approved");
  }

  // Check if the driver already has an active ride
  const existingActiveRide = await Ride.findOne({
    driver: driverId,
    status: { $in: activeRideStatuses },
  });
  if (existingActiveRide) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are already on an active ride"
    );
  }

  // Assign the driver and update the status
  ride.driver = driverId;
  ride.status = RideStatus.ACCEPTED;
  await ride.save();
  return ride;
};

const rejectRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }
  // Only a driver can reject a ride that is requested
  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot reject at this stage");
  }
  // Update the status to rejected
  ride.status = RideStatus.REJECTED;
  await ride.save();
  return ride;
};

const updateRideStatus = async (
  rideId: string,
  driverId: string,
  status: RideStatus
) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  // If driver is trying to update a ride, validate it's theirs
  if (ride.driver?.toString() !== driverId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  // Prevent a driver from updating the status of a completed/cancelled/rejected ride
  if (
    ride.status === RideStatus.COMPLETED ||
    ride.status === RideStatus.CANCELLED ||
    ride.status === RideStatus.REJECTED
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot update a finished ride");
  }

  // Prevent status from going backwards
  if (
    (ride.status === RideStatus.PICKED_UP && status === RideStatus.ACCEPTED) ||
    (ride.status === RideStatus.IN_TRANSIT && status === RideStatus.PICKED_UP)
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status update");
  }

  // Only allow specific transitions
  if (
    (ride.status === RideStatus.ACCEPTED && status === RideStatus.PICKED_UP) ||
    (ride.status === RideStatus.PICKED_UP &&
      status === RideStatus.IN_TRANSIT) ||
    (ride.status === RideStatus.IN_TRANSIT && status === RideStatus.COMPLETED)
  ) {
    ride.status = status;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status transition");
  }

  if (status === RideStatus.COMPLETED) {
    ride.fare = calculateFare(ride.pickupLocation, ride.dropOffLocation);
  }

  await ride.save();
  return ride;
};

const cancelRide = async (rideId: string, riderId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  if (ride.rider?.toString() !== riderId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  // Rider can only cancel a ride that is still in the 'requested' stage.
  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot cancel at this stage");
  }

  ride.status = RideStatus.CANCELLED;
  await ride.save();
  return ride;
};

export const RideServices = {
  requestRide,
  getMyRides,
  getRideById,
  getPendingRides,
  acceptRide,
  rejectRide,
  updateRideStatus,
  cancelRide,
  getActiveRides,
};
