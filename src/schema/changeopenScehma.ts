import {z} from "zod";

const changeOpenSchema = z.object({
    messageId: z.string().min(1, "Message ID is required")
});

export default changeOpenSchema;