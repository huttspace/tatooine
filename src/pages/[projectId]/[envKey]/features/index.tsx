import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  useDisclosure,
  Flex,
  Heading,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import Link from "next/link";
import { PageHeader } from "src/components/";
import { AppLayout } from "src/layouts";

const HEADER_HEIGHT = 64;

const FeaturesPage: NextPageWithLayout = () => {
  return (
    <Box w="full">
      <PageHeader
        title="Features"
        description="This is features page"
        rightAlignedComponent={<Box></Box>}
      />
    </Box>
  );
};

FeaturesPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FeaturesPage;
