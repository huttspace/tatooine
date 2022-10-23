import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createFeatureInput, listFeatureInput } from "src/lib/schema";
import { t, protectedProcedure } from "src/lib/trpc/server/createRouter";

export const featureRouter = t.router({
  create: protectedProcedure
    .input(createFeatureInput)
    .mutation(async ({ ctx, input }) => {
      // const isValidBoolRequest =
      //   input.featureType === "bool" &&
      //   input.values.every((v) => typeof v.value === "boolean");

      // const isValidLimitRequest =
      //   input.featureType !== "bool" &&
      //   input.values.every((v) => typeof v.value === "number");

      // console.log(!isValidBoolRequest && !isValidLimitRequest);
      // if (!isValidBoolRequest && !isValidBoolRequest) {
      //   throw new TRPCError({ code: "BAD_REQUEST" });
      // }

      const feature = await ctx.prisma.feature.findFirst({
        where: { key: input.key, projectId: input.projectId },
      });
      if (feature) throw new TRPCError({ code: "CONFLICT" });

      const environments = await ctx.prisma.environment.findMany({
        where: { projectId: input.projectId },
        include: { environmentPlans: true },
      });
      if (!environments) throw new TRPCError({ code: "NOT_FOUND" });

      // Prisma.EnvironmentFeatureCreateManyFeatureInput
      const environmentFeatureCreateManyInput = environments
        .map((env) => {
          return env.environmentPlans.map((v) => {
            return {
              environmentId: env.id,
              planId: v.planId,
              bool: input.featureType === "bool" ? false : undefined,
              limit: input.featureType !== "bool" ? 0 : undefined,
            };
          });
        })
        .flat();

      const created = await ctx.prisma.feature.create({
        data: {
          ...input,
          environmentFeatures: {
            createMany: {
              data: environmentFeatureCreateManyInput,
            },
          },
        },
      });

      return created;
    }),

  list: protectedProcedure
    .input(listFeatureInput)
    .query(async ({ ctx, input }) => {
      const features = await ctx.prisma.feature.findMany({
        where: { projectId: input.projectId },
        orderBy: { createdAt: "desc" },
        // include: {
        //   environmentFeatures: {
        //     where: { environment: { envKey: input.envKey } },
        //   },
        // },
      });
      if (!features) throw new TRPCError({ code: "NOT_FOUND" });

      return features;
    }),
});
