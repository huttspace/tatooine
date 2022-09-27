import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure, Flex, Heading } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import { PageHeader } from "src/components/";
import { CreatePlan } from "src/features/plans";
import { AppLayout } from "src/layouts";
import { trpc } from "src/utils/trpc";

const HEADER_HEIGHT = 64;

const PlansPage: NextPageWithLayout = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const data = trpc.plans.list.useQuery();

  return (
    <Box h='full'>
      <PageHeader
        title='Plans'
        description='This is plans page'
        rightAlignedComponent={
          <Box>
            <AddPlanButton handleClick={onOpen} />
          </Box>
        }
      />
      <Flex
        h={`calc(100% - ${HEADER_HEIGHT}px)`}
        justifyContent='center'
        alignItems='center'
      >
        <PlanEmptyState handleClick={onOpen} />
      </Flex>
      <CreatePlan isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

const AddPlanButton = ({ handleClick }: { handleClick: () => void }) => (
  <Button onClick={handleClick} leftIcon={<AddIcon />}>
    New
  </Button>
);

const PlanEmptyState = ({ handleClick }: { handleClick: () => void }) => (
  <Box textAlign='center'>
    <Heading fontSize='lg'>Create first plan</Heading>
    <AddPlanButton handleClick={handleClick} />
  </Box>
);

PlansPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default PlansPage;