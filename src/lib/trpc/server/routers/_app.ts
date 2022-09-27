import { t } from "src/lib/trpc/server/createRouter";

const hello = t.procedure.query(() => "hello world");

export const appRouter = t.router({
  hello,
});

export type AppRouter = typeof appRouter;
