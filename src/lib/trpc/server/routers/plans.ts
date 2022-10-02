import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { listPlansInput } from "src/lib/schema";
import { t, protectedProcedure } from "src/lib/trpc/server/createRouter";

export const plansRouter = t.router({
  list: protectedProcedure
    .input(listPlansInput)
    .query(async ({ ctx, input }) => {
      const plans = await ctx.prisma.plan.findMany({
        where: { projectId: input.projectId },
      });
      if (!plans) throw new TRPCError({ code: "NOT_FOUND" });

      return plans;
    }),
});
