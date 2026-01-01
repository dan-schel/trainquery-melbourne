import z from "zod";
import { configDotenv } from "dotenv";

const envSchema = z.object({
  PORT: z.string().optional(),

  // Tip: Use ${_self.COMMIT_HASH} in DigitalOcean to set it automatically.
  COMMIT_HASH: z.string().optional(),
});

configDotenv({ quiet: true });

export const env = envSchema.parse(process.env);
