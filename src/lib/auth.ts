import type { Session } from "next-auth";
import {
  getSession as getSessionInner,
  GetSessionParams,
} from "next-auth/react";

export const getSession = async (params: GetSessionParams) => {
  const session = await getSessionInner(params);

  return session as Session | null;
};
