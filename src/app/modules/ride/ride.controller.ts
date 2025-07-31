import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { RideServices } from "./ride.service";

const createRide = catchAsync(async (req: Request, res: Response) => {
  const riderId = req.user.id;
  const ride = await RideServices.createRide({ ...req.body, rider: riderId });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Ride requested successfully",
    data: ride,
  });
});

const getMyRides = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const role = req.user.role;
  const rides = await RideServices.getMyRides(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride history fetched successfully",
    data: rides,
  });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const status = req.body.status;
  const driverId = req.user?.role === "driver" ? req.user.id : undefined;

  const ride = await RideServices.updateRideStatus(rideId, status, driverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride status updated successfully",
    data: ride,
  });
});

const assignDriver = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const driverId = req.user.id;

  const ride = await RideServices.assignDriverToRide(rideId, driverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride accepted by driver",
    data: ride,
  });
});

export const RideControllers = {
  createRide,
  getMyRides,
  updateRideStatus,
  assignDriver,
};
