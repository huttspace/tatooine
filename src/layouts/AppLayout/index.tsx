import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const AppLayout = ({ children }: LayoutProps) => (
  <Flex>
    <Box w='256px' borderRight='1px' h='100vh'>
      Navigation
    </Box>
    <Box w='full' h='100vh' px={12} pt={8}>
      {children}
    </Box>
  </Flex>
);
