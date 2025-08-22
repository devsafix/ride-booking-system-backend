import { z } from "zod";

export const createUserZodSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters long"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  contactNo: z.string().optional(),
  vehicleType: z.string().optional(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(["rider", "driver", "admin"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be 'rider', 'driver', or 'admin'",
  }),
});
