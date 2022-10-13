import { Button, VStack, Box, Text, Flex } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useParams } from "src/hooks/useParams";

export const Navigation = () => {
  const projectId = useParams("projectId");
  const envKey = useParams("envKey");

  return (
    <Box
      w="200px"
      borderRight="1px"
      borderColor="gray.200"
      h="100vh"
      bg="gray.50"
    >
      <Flex h="full" px={6} py={6} flexDir="column" justify="space-between">
        <VStack align="stretch">
          <InnerLink href={`/${projectId}/${envKey}/plans`}>
            <Text ml={2}>Plans</Text>
          </InnerLink>
          <InnerLink href={`/${projectId}/${envKey}/features`}>
            <Text ml={2}>Features</Text>
          </InnerLink>
          <InnerLink href={`/${projectId}/${envKey}/customers`}>
            <Text ml={2}>Customers</Text>
          </InnerLink>
        </VStack>
        <Button onClick={async () => await signOut()}>sign out</Button>
      </Flex>
    </Box>
  );
};

const InnerLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  const { asPath } = useRouter();
  const isCurrent = asPath.startsWith(href);

  return (
    <Link passHref href={href}>
      <Button
        as="a"
        fontSize="sm"
        fontWeight="semibold"
        size="sm"
        variant="ghost"
        justifyContent="flex-start"
        cursor="pointer"
        bg={isCurrent ? "gray.200" : "inherit"}
        _hover={{ bg: "gray.200" }}
        w="full"
      >
        {children}
      </Button>
    </Link>
  );
};
