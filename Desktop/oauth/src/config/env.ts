import { z } from "zod";

const envSchema = z.object({
    PORT: z
        .string().transform((value)=> Number(value)),
    JWT_ACCESS_SECRET: z
        .string()
        .min(2),
    JWT_REFRESH_SECRET: z
        .string()
        .min(2),
    DATABASE_URL: z
        .string(),
});
export const env = envSchema.parse(process.env);

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type LoginBody = z.infer<typeof loginSchema>;
