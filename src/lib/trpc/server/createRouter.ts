import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./createContext";

export const t = initTRPC.context<Context>().create({ transformer: superjson });

const isAuthed = t.middleware(({ ctx, next }) => {
  // TODO: authorize the user
  return next({
    ctx: {
      user: { id: "user_id" },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
