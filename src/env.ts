import { z } from "zod";

const EnvSchema = z.object({
  POSTGRES_URL: z.string(),
  ELECTRIC_HOST: z.string(),
});

export const env = EnvSchema.parse(process.env);
