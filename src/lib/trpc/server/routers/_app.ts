import { t } from "src/lib/trpc/server/createRouter";
import { plansRouter } from "src/lib/trpc/server/routers/plans";
import { projectsRouter } from "src/lib/trpc/server/routers/projects";

export const appRouter = t.router({
  projects: projectsRouter,
  plans: plansRouter,
});

export type AppRouter = typeof appRouter;
