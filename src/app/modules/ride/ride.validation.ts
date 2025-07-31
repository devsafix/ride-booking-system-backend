import { z } from "zod";
import { RideStatus } from "./ride.interface";

export const createRideZodSchema = z.object({
  rider: z.string().min(1, "Rider ID is required"),

  pickupLocation: z
    .string()
    .min(2, "Pickup location must be at least 2 characters long"),

  dropOffLocation: z
    .string()
    .min(2, "Drop-off location must be at least 2 characters long"),

  fare: z.number().nonnegative("Fare cannot be negative").optional(),

  driver: z.string().min(1, "Driver ID must be a string").optional(),
});

export const updateRideStatusZodSchema = z.object({
  status: z.enum([...Object.values(RideStatus)] as [
    RideStatus,
    ...RideStatus[]
  ]),
});
