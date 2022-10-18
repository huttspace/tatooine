import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./createContext";
import { getSession } from "src/lib/auth";
import { prisma } from "src/lib/prisma";

export const t = initTRPC.context<Context>().create({ transformer: superjson });

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const session = await getSession(ctx);
  console.log({ session });
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
