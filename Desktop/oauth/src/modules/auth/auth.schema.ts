import { z } from "zod";

export const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2)
        .max(72),
    lastName: z
        .string()
        .trim()
        .min(2)
        .max(72),
    email: z
        .email(),
    password: z
        .string()
        .trim()
        .min(8)
        .max(72)
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;