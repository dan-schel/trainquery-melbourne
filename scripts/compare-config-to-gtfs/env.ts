import z from "zod";
import { configDotenv } from "dotenv";

const envSchema = z.object({
  RELAY_KEY: z.string(),
  GITHUB_API_URL: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_REPOSITORY: z.string().optional(),
  GITHUB_REPOSITORY_OWNER: z.string().optional(),
  COMMIT_SHA: z.string().optional(),
});

configDotenv({ quiet: true });

export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
