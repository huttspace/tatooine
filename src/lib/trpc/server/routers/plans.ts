import { TRPCError } from "@trpc/server";
import { listPlansInput, createPlanInput } from "src/lib/schema";
import { t, protectedProcedure } from "src/lib/trpc/server/createRouter";

export const plansRouter = t.router({
  list: protectedProcedure
    .input(listPlansInput)
    .query(async ({ ctx, input }) => {
      const plans = await ctx.prisma.plan.findMany({
        where: { projectId: input.projectId },
        orderBy: { createdAt: "desc" },
        include: {
          environmentPlans: {
            where: { environment: { envKey: input.envKey } },
          },
        },
      });
      if (!plans) throw new TRPCError({ code: "NOT_FOUND" });

      return plans;
    }),

  create: protectedProcedure
    .input(createPlanInput)
    .mutation(async ({ ctx, input: { name, key, description, projectId } }) => {
      const environments = await ctx.prisma.environment.findMany({
        where: { projectId },
      });
      if (!environments) throw new TRPCError({ code: "NOT_FOUND" });

      const existing = await ctx.prisma.plan.findFirst({
        where: { projectId, key },
      });
      if (existing) throw new TRPCError({ code: "CONFLICT" });

      const plan = await ctx.prisma.plan.create({
        data: {
          name,
          key,
          description,
          projectId,
          environmentPlans: {
            createMany: {
              data: environments.map((env) => ({ environmentId: env.id })),
            },
          },
        },
      });

      return plan;
    }),
});
