import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./createContext";
import { getSession } from "src/lib/auth";

export const t = initTRPC.context<Context>().create({ transformer: superjson });

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const session = await getSession(ctx);
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      user: session.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
