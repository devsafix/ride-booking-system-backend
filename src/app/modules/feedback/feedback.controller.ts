import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { FeedbackServices } from "./feedback.service";

const submitRatingAndFeedback = catchAsync(
  async (req: Request, res: Response) => {
    const { rating, comment, rideId } = req.body;
    const riderId = req.user.id;

    const result = await FeedbackServices.submitFeedback(
      riderId,
      rideId,
      rating,
      comment
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Feedback submitted successfully",
      data: result,
    });
  }
);

const getDriverRatings = catchAsync(async (req: Request, res: Response) => {
  const { driverId } = req.params;
  const result = await FeedbackServices.getDriverRatings(driverId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Driver ratings retrieved successfully",
    data: result,
  });
});

export const FeedbackControllers = {
  submitRatingAndFeedback,
  getDriverRatings,
};
