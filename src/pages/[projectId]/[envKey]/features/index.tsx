import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  useDisclosure,
  Flex,
  Heading,
  Text,
  Tag,
} from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import Link from "next/link";
import { PageHeader } from "src/components/";
import { CreateFeature } from "src/features/features";
import { useParams } from "src/hooks/useParams";
import { AppLayout } from "src/layouts";
import { trpc, Feature } from "src/utils/trpc";

const HEADER_HEIGHT = 64;

const FeaturesPage: NextPageWithLayout = () => {
  const projectId = useParams("projectId");
  const envKey = useParams("envKey");

  const { data: features, isLoading } = trpc.features.list.useQuery({
    projectId,
    envKey,
  });

  const { onOpen, isOpen, onClose } = useDisclosure();

  if (!features) return null;

  return (
    <Box h="full">
      <PageHeader
        title="Features"
        description="This is features page"
        rightAlignedComponent={
          <Box>
            <AddFeatureButton handleClick={onOpen} />
          </Box>
        }
      />
      {features.length ? (
        <FeatureList features={features} />
      ) : (
        <FeatureEmptyState handleClick={onOpen} />
      )}
      <CreateFeature
        onClose={onClose}
        isOpen={isOpen}
        projectId={projectId}
        envKey={envKey}
      />
    </Box>
  );
};

const FeatureList = ({ features }: { features: Feature[] }) => (
  <Box border="1px" borderColor="gray.200" rounded="6px" mt={8}>
    {features.map((feature) => (
      <FeatureListItem feature={feature} key={feature.id} />
    ))}
  </Box>
);

const FeatureListItem = ({ feature }: { feature: Feature }) => (
  <Box borderBottom="1px" borderColor="gray.200" p={4} cursor="pointer">
    <Link href="/" passHref>
      <Box>
        <Box>
          <Heading fontSize="md">{feature.name}</Heading>
          <Text fontSize="sm" color="gray.600">
            {feature.description}
          </Text>
        </Box>
        <Tag size="sm" mt={2}>
          {feature.key}
        </Tag>
      </Box>
    </Link>
  </Box>
);

const AddFeatureButton = ({ handleClick }: { handleClick: () => void }) => (
  <Button onClick={handleClick} leftIcon={<AddIcon />}>
    New
  </Button>
);

const FeatureEmptyState = ({ handleClick }: { handleClick: () => void }) => (
  <Flex
    h={`calc(100% - ${HEADER_HEIGHT}px)`}
    justifyContent="center"
    alignItems="center"
  >
    <Box textAlign="center">
      <Heading fontSize="lg">Create first feature</Heading>
      <AddFeatureButton handleClick={handleClick} />
    </Box>
  </Flex>
);

FeaturesPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FeaturesPage;
