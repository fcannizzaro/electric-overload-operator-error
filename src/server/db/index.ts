import { env } from "@/env";
import type { InferEnum, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";
import pg from "pg";

export const categoryEnum = pgEnum("category", [
  "P3",
  "P4",
  "P5",
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "S6",
]);

export type Category = InferEnum<typeof categoryEnum>;

export const challengeEnum = pgEnum("challenge", [
  "qualification",
  "institute",
  "area",
  "national",
]);

export type Challenge = InferEnum<typeof challengeEnum>;

export const locks = pgTable(
  "lock",
  {
    challenge: challengeEnum().notNull(),
    category: categoryEnum().notNull(),
    school: integer().notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    primaryKey({
      name: "pl_locks_school_challenge_category",
      columns: [t.challenge, t.category, t.school],
    }),
  ]
);

const client = new pg.Pool({
  connectionString: env.POSTGRES_URL,
});

export const db = drizzle(client, {
  schema: {
    locks,
  },
});

export type DB = typeof db;

export type Lock = InferSelectModel<typeof locks>;
