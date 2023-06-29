"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        age: zod_1.z.number({
            required_error: "Age is required.",
        }),
        price: zod_1.z.number({
            required_error: "Price is required.",
        }),
        location: zod_1.z.enum([...cow_constant_1.location]),
        breed: zod_1.z.enum([...cow_constant_1.breed]),
        weight: zod_1.z.number({
            required_error: "Weight is required.",
        }),
        label: zod_1.z.enum([...cow_constant_1.label]),
        category: zod_1.z.enum([...cow_constant_1.category]),
        seller: zod_1.z.string({
            required_error: "Seller id is required.",
        }),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
};
