import { createCollection } from "@tanstack/react-db";
import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import type { Lock } from "@/server/db";

export const lockCollection = createCollection(
  electricCollectionOptions<Lock>({
    id: "locks",
    shapeOptions: {
      url: "http://localhost:3000/api/sync/lock",
      liveSse: true,
      parser: {
        timestamp: (date: string) => new Date(date),
        timestamptz: (date: string) => new Date(date),
      },
    },
    syncMode: "on-demand",
    // syncMode: "progressive" gives error and then loads data
    getKey: (item) => item.category + item.challenge + item.school,
  })
);
