import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = async (
  option?: trpcNext.CreateNextContextOptions,
) => {
  return { user: { id: "string" } };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
