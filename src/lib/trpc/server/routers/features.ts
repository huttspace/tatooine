import { TRPCError } from "@trpc/server";
import { createFeatureInput } from "src/lib/schema";
import { t, protectedProcedure } from "src/lib/trpc/server/createRouter";

export const featureRouter = t.router({
  create: protectedProcedure
    .input(createFeatureInput)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const values = [input.bool, input.limitRate];
      const invalidValues =
        values.every((v) => v !== null) || values.every((v) => v == null);
      if (invalidValues) throw new TRPCError({ code: "BAD_REQUEST" });

      const feature = await ctx.prisma.feature.findFirst({
        where: { key: input.key },
      });
      if (feature) throw new TRPCError({ code: "CONFLICT" });

      const created = await ctx.prisma.feature.create({
        data: {
          ...input,
          bool: input.bool ?? undefined,
          limitRate: input.limitRate ?? undefined,
        },
      });

      return created;
    }),
});
