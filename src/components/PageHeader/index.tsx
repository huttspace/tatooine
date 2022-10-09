import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export type Props = {
  title: string;
  description?: string;
  rightAlignedComponent?: ReactNode;
};

export const PageHeader = ({
  title,
  description,
  rightAlignedComponent,
}: Props) => (
  <Box
    w="full"
    display="flex"
    justifyContent="space-between"
    alignItems="flex-start"
  >
    <Box>
      <VStack spacing={1} align="stretch">
        <Heading fontSize="xl">{title}</Heading>
        {description && (
          <Text fontSize="sm" color="gray.500">
            {description}
          </Text>
        )}
      </VStack>
    </Box>
    <Box>{rightAlignedComponent && rightAlignedComponent}</Box>
  </Box>
);
