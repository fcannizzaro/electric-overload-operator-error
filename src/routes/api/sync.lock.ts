import { createFileRoute } from "@tanstack/react-router";
import { createElectricStream } from "@/util/electric";

export const Route = createFileRoute("/api/sync/lock")({
  server: {
    handlers: {
      GET: async ({ request }) => createElectricStream(request, `lock`),
    },
  },
});
