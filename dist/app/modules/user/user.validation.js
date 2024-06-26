"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        //  image: z.string().optional(),
        // image: z
        //   .array(
        //     z.object({
        //       imgs: z.string().optional(),
        //     }),
        //   )
        //   .optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
