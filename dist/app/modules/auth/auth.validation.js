"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../user/user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        role: zod_1.z.enum([...user_constant_1.role], {
            required_error: "Role is required",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is required.",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is required.",
            }),
        }),
        address: zod_1.z.string({
            required_error: "Address is required.",
        }),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.AuthValidation = {
    createUserZodSchema,
};
