import { z } from "zod";

export const createUrlSchema = z.object({
    originalUrl: z.url()
});

export type CreateUrlInput = z.infer<typeof createUrlSchema>;