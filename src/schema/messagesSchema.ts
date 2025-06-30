import { z } from "zod";

export const messagesSchema = z.object({
    content: z.string()
        .max(1000,"Message is too long"),
})