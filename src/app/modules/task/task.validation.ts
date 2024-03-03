import { z } from "zod";

const createTaskZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required.",
    }),
    description: z.string({
      required_error: "Description is required.",
    }),
    dueDate: z.string({
      required_error: "Due Date is required.",
    }),
    user: z.string({
      required_error: "User is required.",
    }),
  }),
});

const updateTaskZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    deuDate: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const TaskValidation = {
  createTaskZodSchema,
  updateTaskZodSchema,
};
