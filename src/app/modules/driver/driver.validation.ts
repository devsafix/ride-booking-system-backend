import { z } from "zod";

export const updateAvailabilityZodSchema = z.object({
  isAvailable: z.boolean({
    error: "isAvailable must be a boolean",
  }),
});
