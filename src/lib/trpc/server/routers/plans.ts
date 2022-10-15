import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  listPlansInput,
  createPlanInput,
  singlePlansInput,
} from "src/lib/schema";
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

  single: protectedProcedure
    .input(singlePlansInput)
    .query(async ({ ctx, input }) => {
      const env = await ctx.prisma.environment.findUnique({
        where: {
          projectId_envKey: {
            projectId: input.projectId,
            envKey: input.envKey,
          },
        },
        select: { id: true },
      });
      if (!env) throw new TRPCError({ code: "NOT_FOUND" });

      const envPlan = await ctx.prisma.environmentPlan.findUnique({
        where: {
          planId_environmentId: {
            planId: input.planId,
            environmentId: env.id,
          },
        },
        include: {
          environmentFeatures: {
            include: {
              feature: true,
            },
          },
          plan: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      });
      if (!envPlan) throw new TRPCError({ code: "NOT_FOUND" });

      const res = {
        id: envPlan.plan.id,
        name: envPlan.plan.name,
        description: envPlan.plan.description,
        features: envPlan.environmentFeatures.map((envFeature) => ({
          ...envFeature.feature,
          value: envFeature.limit ?? envFeature.bool,
        })),
      };

      return res;
    }),

  create: protectedProcedure
    .input(createPlanInput)
    .mutation(async ({ ctx, input: { name, key, description, projectId } }) => {
      const project = await ctx.prisma.project.findUnique({
        where: { id: projectId },
        include: { environments: true, feature: true },
      });
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });

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
          // environmentPlans: {
          //   create: {
          //     environmentId: "cl92s3no900326iai1dscqds6",
          //     environmentFeatures: {
          //       create: {
          //         featureId: "cl92scl5801256iaijuady4nn",
          //         bool: null,
          //         limit: null,
          //       },
          //     },
          //   },
          // },
          environmentPlans: {
            create: project.environments.map(
              (env): Prisma.EnvironmentPlanUncheckedCreateWithoutPlanInput => ({
                environmentId: env.id,
                environmentFeatures: {
                  create: project.feature.map((feature) => ({
                    featureId: feature.id,
                    limit: feature.featureType !== "bool" ? 0 : undefined,
                    bool: feature.featureType === "bool" ? false : undefined,
                  })),
                },
              }),
            ),
          },
        },
      });

      return plan;
    }),
});

// Prisma.EnvironmentFeatureCreateNestedManyWithoutEnvironmentPlanInput
