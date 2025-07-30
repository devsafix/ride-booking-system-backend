import { z } from "zod";
import { RideStatus } from "./ride.interface";

export const createRideZodSchema = z.object({
  pickupLocation: z
    .string({
      error: "Pickup location must be a string",
    })
    .min(2, { message: "Pickup location must be at least 2 characters long" }),
  dropOffLocation: z
    .string({
      error: "Drop-off location must be a string",
    })
    .min(2, {
      message: "Drop-off location must be at least 2 characters long",
    }),
  fare: z
    .number({
      error: "Fare must be a number",
    })
    .nonnegative({ message: "Fare must be a positive number" }),
});

export const updateRideStatusZodSchema = z.object({
  status: z.enum(Object.values(RideStatus) as [string]),
});
