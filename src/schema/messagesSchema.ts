import { z } from "zod";

export const messagesSchema = z.object({
    content: z.string()
})