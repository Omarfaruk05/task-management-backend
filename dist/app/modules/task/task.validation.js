"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidation = void 0;
const zod_1 = require("zod");
const createTaskZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required.",
        }),
        description: zod_1.z.string({
            required_error: "Description is required.",
        }),
        dueDate: zod_1.z.string({
            required_error: "Due Date is required.",
        }),
        user: zod_1.z.string({
            required_error: "User is required.",
        }),
    }),
});
const updateTaskZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        deuDate: zod_1.z.string().optional(),
        user: zod_1.z.string().optional(),
    }),
});
exports.TaskValidation = {
    createTaskZodSchema,
    updateTaskZodSchema,
};
