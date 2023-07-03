"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        role: zod_1.z.enum([...admin_constant_1.adminRole], {
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
    }),
});
const AdminLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required.",
        }),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
    AdminLoginZodSchema,
};
