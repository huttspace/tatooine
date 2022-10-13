import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Navigation } from "src/components";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const AppLayout = ({ children }: LayoutProps) => (
  <Flex>
    <Box>
      <Navigation />
    </Box>
    <Box w="full" h="100vh" px={12} pt={8}>
      {children}
    </Box>
  </Flex>
);
