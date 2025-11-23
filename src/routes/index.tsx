import { lockCollection } from "@/collections";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  ssr: false,
});

function App() {
  const challenge = "qualification";
  const { data } = useLiveQuery(
    (q) => {
      return q
        .from({ lock: lockCollection })
        .where(({ lock }) => eq(lock.challenge, challenge))
        .select(({ lock }) => ({
          school: lock.school,
          category: lock.category,
        }));
    },
    [challenge]
  );
  return JSON.stringify(data);
}
