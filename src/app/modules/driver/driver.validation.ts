import { z } from "zod";

export const updateAvailabilityZodSchema = z.object({
  isAvailable: z.boolean({
    invalid_type_error: "isAvailable must be a boolean",
  }),
});
