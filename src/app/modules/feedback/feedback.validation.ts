import { z } from "zod";

export const createFeedbackZodSchema = z.object({
  rideId: z
    .string({
      required_error: "Ride ID is required",
    })
    .nonempty("Ride ID cannot be empty"),
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z.string().optional(),
});
