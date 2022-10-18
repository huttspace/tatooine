import { useRouter } from "next/router";

type Params = { projectId: string; envKey: string; planId: string };
type ParamsKeys = keyof Params;

export const useParams = (key: ParamsKeys) => {
  const router = useRouter();

  return router.query[key] as string;
};

export const useParameters = (keys: ParamsKeys[]) => {
  const router = useRouter();

  return keys.map((key) => router.query[key]) as string[];
};
