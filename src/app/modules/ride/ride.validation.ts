import { z } from "zod";
import { RideStatus } from "./ride.interface";

// Zod schema for a location object
const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
});

export const createRideZodSchema = z.object({
  pickupLocation: locationSchema,
  dropOffLocation: locationSchema,
});

export const updateRideStatusZodSchema = z.object({
  status: z
    .enum([...Object.values(RideStatus)] as [RideStatus, ...RideStatus[]])
    .optional(),
});
