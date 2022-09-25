import { ChakraProvider } from "@chakra-ui/react";
import type { AppPropsWithLayout } from "next/app";
import { theme } from "src/lib/theme";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default MyApp;
