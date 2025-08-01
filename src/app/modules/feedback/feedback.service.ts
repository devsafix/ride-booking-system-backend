import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Ride } from "../ride/ride.model";
import { User } from "../user/user.model";
import { Feedback } from "./feedback.model";
import { RideStatus } from "../ride/ride.interface";

const submitFeedback = async (
  riderId: string,
  rideId: string,
  rating: number,
  comment?: string
) => {
  // 1. Find the ride and validate its state
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  // 2. Check if the authenticated user is the rider for this ride
  if (ride.rider?.toString() !== riderId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  // 3. Ensure the ride is completed and has not been rated yet
  if (ride.status !== RideStatus.COMPLETED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only rate a completed ride"
    );
  }
  if (ride.feedback) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This ride has already been rated"
    );
  }

  // 4. Find the driver who completed the ride
  const driver = await User.findById(ride.driver);
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  // 5. Create the new feedback document
  const newFeedback = await Feedback.create({
    rating,
    comment,
    rider: riderId,
    driver: driver._id,
    ride: rideId,
  });

  // 6. Update the driver's total and average rating
  const totalRatings = (driver.totalRatings || 0) + 1;
  const newAverageRating =
    ((driver.averageRating || 0) * (driver.totalRatings || 0) + rating) /
    totalRatings;

  driver.averageRating = newAverageRating;
  driver.totalRatings = totalRatings;
  await driver.save();

  // 7. Update the ride document to link the feedback
  ride.feedback = newFeedback._id.toString();
  await ride.save();

  return newFeedback;
};

const getDriverRatings = async (driverId: string) => {
  const driver = await User.findById(driverId).select(
    "name averageRating totalRatings"
  );
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }
  const feedback = await Feedback.find({ driver: driverId }).populate(
    "rider",
    "name"
  );
  return { driver, feedback };
};

export const FeedbackServices = {
  submitFeedback,
  getDriverRatings,
};
