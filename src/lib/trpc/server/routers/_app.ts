import { t } from "src/lib/trpc/server/createRouter";
import { featureRouter } from "src/lib/trpc/server/routers/features";
import { plansRouter } from "src/lib/trpc/server/routers/plans";
import { projectsRouter } from "src/lib/trpc/server/routers/projects";

export const appRouter = t.router({
  projects: projectsRouter,
  plans: plansRouter,
  features: featureRouter,
});

export type AppRouter = typeof appRouter;
