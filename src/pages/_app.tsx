import { ChakraProvider } from "@chakra-ui/react";
import type { AppPropsWithLayout } from "next/app";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>;
}

export default MyApp;
