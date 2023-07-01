import { z } from "zod";
import { adminRole } from "./admin.constant";

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),
    role: z.enum([...adminRole] as [string, ...string[]], {
      required_error: "Role is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First Name is required.",
      }),
      lastName: z.string({
        required_error: "Last Name is required.",
      }),
    }),
    address: z.string({
      required_error: "Address is required.",
    }),
  }),
});

const AdminLoginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),
    password: z.string({
      required_error: "Password is required.",
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  AdminLoginZodSchema,
};
