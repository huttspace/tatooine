import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { createTRPCNext } from "src/lib/trpc/next";
import { inferProcedureInput, inferProcedureOutput } from "src/lib/trpc/server";
import { AppRouter } from "src/lib/trpc/server/routers/_app";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [httpBatchLink({ url: "/api/trpc" })],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: Infinity,
          },
        },
      },
    };
  },
});

export type Plan = inferProcedureOutput<AppRouter["plans"]["list"]>[0];

export type Feature = inferProcedureOutput<AppRouter["features"]["list"]>[0];
