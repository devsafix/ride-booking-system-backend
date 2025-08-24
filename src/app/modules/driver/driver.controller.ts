import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { DriverServices } from "./driver.service";
import AppError from "../../errorHelpers/AppError";

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  if (!req.body || typeof req.body.isAvailable === "undefined") {
    throw new AppError(httpStatus.BAD_REQUEST, "isAvailable field is required");
  }

  const driverId = req.user.id;
  const { isAvailable } = req.body;

  const result = await DriverServices.updateAvailabilityStatus(
    driverId,
    isAvailable
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Driver availability status updated successfully",
    data: result,
  });
});

const getEarnings = catchAsync(async (req: Request, res: Response) => {
  const driverId = req.user.id;
  const result = await DriverServices.getEarningsHistory(driverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Earnings history retrieved successfully",
    data: result,
  });
});

export const DriverControllers = {
  updateAvailability,
  getEarnings,
};
