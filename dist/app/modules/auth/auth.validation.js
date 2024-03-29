"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../user/user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z.string({ required_error: "Email is required." }),
        password: zod_1.z.string({ required_error: "Password is required." }),
        role: zod_1.z.enum([...user_constant_1.role]).optional(),
        address: zod_1.z.string().optional(),
    }),
});
const userLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required.",
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.AuthValidation = {
    createUserZodSchema,
    userLoginZodSchema,
    refreshTokenZodSchema,
};
