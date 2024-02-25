import { z } from "zod";
import { role } from "../user/user.constant";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required." }),
    password: z.string({ required_error: "Password is required." }),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    address: z.string().optional(),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    name: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
