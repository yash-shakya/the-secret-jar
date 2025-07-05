import {z} from "zod";

export const changerUsernameSchema = z.object({
    newUsername:z.string()
        .min(3, {message: "username must be at least 3 characters long"})
        .max(20, {message: "username must be at most 20 characters long"})
        .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters'),
})