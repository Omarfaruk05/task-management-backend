import { z } from "zod";
import { breed, category, label, location } from "./cow.constant";

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string(),
    age: z.number({
      required_error: "Age is required.",
    }),
    price: z.number({
      required_error: "Price is required.",
    }),
    location: z.enum([...location] as [string, ...string[]]),
    breed: z.enum([...breed] as [string, ...string[]]),
    weight: z.number({
      required_error: "Weight is required.",
    }),
    label: z.enum([...label] as [string, ...string[]]),
    category: z.enum([...category] as [string, ...string[]]),
    seller: z.string({
      required_error: "Seller id is required.",
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
