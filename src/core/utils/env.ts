import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default('http://localhost:9500/api'),
  JWT_SECRET: z.string().min(32),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
}); 