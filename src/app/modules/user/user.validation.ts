// src/app/modules/user/user.validation.ts
import { z } from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required", // Correctly used on the object property
      })
      .min(2, "Name must be at least 2 characters long"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters long"),
    role: z.enum(["rider", "driver", "admin"], {
      required_error: "Role is required",
      invalid_type_error: "Role must be 'rider', 'driver', or 'admin'",
    }),
  }),
});

export const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .optional(),
    email: z.string().email("Invalid email format").optional(),
    role: z
      .enum(["rider", "driver", "admin"], {
        invalid_type_error: "Role must be 'rider', 'driver', or 'admin'",
      })
      .optional(),
    isBlocked: z.boolean().optional(),
    isApproved: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
  }),
});

export const userIdParamZodSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "User ID is required in the URL parameters",
      })
      .nonempty("User ID cannot be empty"),
  }),
});
