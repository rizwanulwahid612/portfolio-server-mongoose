import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
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

export const UserValidation = {
  createUserZodSchema,
};
