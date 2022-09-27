import { z } from "zod";
import { t, protectedProcedure } from "src/lib/trpc/server/createRouter";

export const projectsRouter = t.router({
  find: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: { id: input.projectId },
      });

      return project;
    }),
});
