import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure, Flex, Heading } from "@chakra-ui/react";
import { NextPageWithLayout } from "next";
import { PageHeader } from "src/components/";
import { AppLayout } from "src/layouts";

const HEADER_HEIGHT = 64;

const PlansPage: NextPageWithLayout = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

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
      {/* <CreatePlan isOpen={isOpen} onClose={onClose} />*/}
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
