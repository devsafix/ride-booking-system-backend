import { z } from "zod";

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
