import { ChakraProvider } from "@chakra-ui/react";
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
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} session={session} />)}
      </SessionProvider>
    </ChakraProvider>
  );
}

// https://zenn.dev/sora_kumo/articles/e86bbf0291d4a7
MyApp.getInitialProps = async () => ({ pageProps: {} });

export default trpc.withTRPC(MyApp);
