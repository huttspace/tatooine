import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "src/lib/prisma";

export const createContext = async (
  option?: trpcNext.CreateNextContextOptions,
) => {
  return { prisma, req: option?.req, res: option?.res };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

interface CreateContextOptions {
  // session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}
