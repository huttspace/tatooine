import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "src/lib/prisma";

export const createContext = async (
  option?: trpcNext.CreateNextContextOptions,
) => {
  return { prisma };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
