import { z } from "zod";
import { role } from "../user/user.constant";

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    name: z
      .object({
        firstName: z.string(),
        lastName: z.string(),
      })
      .optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
};
