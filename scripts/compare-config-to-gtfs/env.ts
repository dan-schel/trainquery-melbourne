import z from "zod";
import { configDotenv } from "dotenv";

const envSchema = z.object({
  RELAY_KEY: z.string(),
});

configDotenv({ quiet: true });

export const env = envSchema.parse(process.env);
