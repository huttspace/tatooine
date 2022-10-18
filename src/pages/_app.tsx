import { ChakraProvider } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppPropsWithLayout } from "next/app";
import { theme } from "src/lib/theme";
import { trpc } from "src/utils/trpc";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <ReactQueryDevtools initialIsOpen={false} />
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} session={session} />)}
        </SessionProvider>
      </MantineProvider>
    </ChakraProvider>
  );
}

// https://zenn.dev/sora_kumo/articles/e86bbf0291d4a7
MyApp.getInitialProps = async () => ({ pageProps: {} });

export default trpc.withTRPC(MyApp);
