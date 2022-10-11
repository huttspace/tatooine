import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import { PageHeader } from "src/components/";
import { CreateFeature } from "src/features/features";
import { useParams } from "src/hooks/useParams";
import { AppLayout } from "src/layouts";
import { trpc } from "src/utils/trpc";

const HEADER_HEIGHT = 64;

const FeaturesPage: NextPageWithLayout = () => {
  const projectId = useParams("projectId");
  const envKey = useParams("envKey");

  const { data, isLoading } = trpc.features.list.useQuery({
    projectId,
    envKey,
  });

  console.log({ data });

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Box w="full">
      <PageHeader
        title="Features"
        description="This is features page"
        rightAlignedComponent={
          <Box>
            <AddFeatureButton handleClick={onOpen} />
          </Box>
        }
      />
      <CreateFeature
        onClose={onClose}
        isOpen={isOpen}
        projectId={projectId}
        envKey={envKey}
      />
    </Box>
  );
};

const AddFeatureButton = ({ handleClick }: { handleClick: () => void }) => (
  <Button onClick={handleClick} leftIcon={<AddIcon />}>
    New
  </Button>
);

FeaturesPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FeaturesPage;
