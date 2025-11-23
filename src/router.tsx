import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const queryClient = new QueryClient();
  const router = routerWithQueryClient(
    // @ts-expect-error skip
    createTanStackRouter({
      routeTree,
      defaultPreload: "intent",
      notFoundMode: "root",
      scrollRestoration: true,
      scrollRestorationBehavior: "instant",
      context: { queryClient },
    }),
    queryClient
  );

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
