import z from "zod";
import { configDotenv } from "dotenv";

const envSchema = z.object({
  RELAY_KEY: z.string(),
  GITHUB_TOKEN: z.string().optional(),
});

configDotenv({ quiet: true });

export const env = envSchema.parse(process.env);
