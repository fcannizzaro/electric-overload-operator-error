import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: ["./src/server/db"],
  dialect: "postgresql",
  schemaFilter: ["public"],
  casing: "snake_case",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  verbose: true,
  strict: false,
} satisfies Config;
