import { MantineProvider } from "@mantine/core";
import { createTRPCReact } from "@trpc/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

const trpc = createTRPCReact();

function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5000/trpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

// enhance your stories with decorator that uses ThemeWrapper
export const decorators = [
  (renderStory: Function) => <Wrapper>{renderStory()}</Wrapper>,
];
