import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { createTRPCNext } from "src/lib/trpc/next";
import { AppRouter } from "src/lib/trpc/server/routers/_app";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
    };
  },
});
