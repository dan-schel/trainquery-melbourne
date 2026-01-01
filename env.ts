import z from "zod";
import { configDotenv } from "dotenv";

const envSchema = z.object({
  PORT: z.string().optional(),
  COMMIT_HASH: z.string().optional(),
});

configDotenv({ quiet: true });

export const env = envSchema.parse(process.env);
