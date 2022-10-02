export const pagesPath = {
  _projectId: (projectId: string | number) => ({
    plans: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/[projectId]/plans" as const,
        query: { projectId },
        hash: url?.hash,
      }),
    },
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
