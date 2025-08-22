import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { RideServices } from "./ride.service";
import { RideStatus } from "./ride.interface";

const requestRide = catchAsync(async (req: Request, res: Response) => {
  const riderId = req.user.id;
  const ride = await RideServices.requestRide(riderId, req.body);

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
  const rides = await RideServices.getMyRides(userId, role, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride history fetched successfully",
    data: rides,
  });
});

const getRideById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const ride = await RideServices.getRideById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride details fetched successfully",
    data: ride,
  });
});

const getPendingRides = catchAsync(async (req: Request, res: Response) => {
  const result = await RideServices.getPendingRides();

  if (result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "No pending rides available at the moment.",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending rides fetched successfully",
    data: result,
  });
});

const acceptRide = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const driverId = req.user.id;
  const ride = await RideServices.acceptRide(rideId, driverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride accepted by driver",
    data: ride,
  });
});

const rejectRide = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const driverId = req.user.id;
  const ride = await RideServices.rejectRide(rideId, driverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride rejected by driver",
    data: ride,
  });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const driverId = req.user.id;
  const status = req.body.status as RideStatus;
  const ride = await RideServices.updateRideStatus(rideId, driverId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride status updated successfully",
    data: ride,
  });
});

const cancelRide = catchAsync(async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const riderId = req.user.id;
  const ride = await RideServices.cancelRide(rideId, riderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride cancelled successfully",
    data: ride,
  });
});

export const RideControllers = {
  requestRide,
  getMyRides,
  getRideById,
  getPendingRides,
  acceptRide,
  rejectRide,
  updateRideStatus,
  cancelRide,
};
