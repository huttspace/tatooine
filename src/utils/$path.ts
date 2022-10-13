export const pagesPath = {
  _projectId: (projectId: string | number) => ({
    _envKey: (envKey: string | number) => ({
      features: {
        $url: (url?: { hash?: string }) => ({
          pathname: "/[projectId]/[envKey]/features" as const,
          query: { projectId, envKey },
          hash: url?.hash,
        }),
      },
      plans: {
        $url: (url?: { hash?: string }) => ({
          pathname: "/[projectId]/[envKey]/plans" as const,
          query: { projectId, envKey },
          hash: url?.hash,
        }),
      },
    }),
  }),
  auth: {
    login: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/auth/login" as const,
        hash: url?.hash,
      }),
    },
  },
  $url: (url?: { hash?: string }) => ({
    pathname: "/" as const,
    hash: url?.hash,
  }),
};

export type PagesPath = typeof pagesPath;
