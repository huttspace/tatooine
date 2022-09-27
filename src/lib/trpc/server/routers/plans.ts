import { t, protectedProcedure } from "src/lib/trpc/server/createRouter";

export const plansRouter = t.router({
  list: protectedProcedure.query(({ ctx }) => {
    return { plans: [], userId: ctx.user.id };
  }),
});
