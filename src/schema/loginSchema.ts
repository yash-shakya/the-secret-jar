import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
        .min(6, {message: "password must be at least 6 characters long"})
})