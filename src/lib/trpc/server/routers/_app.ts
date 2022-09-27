import { t } from "src/lib/trpc/server/createRouter";
import { plansRouter } from "src/lib/trpc/server/routers/plans";

export const appRouter = t.router({
  plans: plansRouter,
});

export type AppRouter = typeof appRouter;
