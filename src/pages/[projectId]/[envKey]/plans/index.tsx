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
import { CreatePlan } from "src/features/plans";
import { useParams } from "src/hooks/useParams";
import { AppLayout } from "src/layouts";
import { Plan, trpc } from "src/utils/trpc";

const HEADER_HEIGHT = 64;

const PlansPage: NextPageWithLayout = () => {
  const projectId = useParams("projectId");
  const envKey = useParams("envKey");
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { isLoading, data: plans } = trpc.plans.list.useQuery({
    projectId,
    envKey,
  });

  if (isLoading) return <Spinner />;
  if (!plans) return null;

  return (
    <Box h="full">
      <PageHeader
        title="Plans"
        description="This is plans page"
        rightAlignedComponent={
          <Box>
            <AddPlanButton handleClick={onOpen} />
          </Box>
        }
      />
      {plans.length ? (
        <PlanList plans={plans} projectId={projectId} envKey={envKey} />
      ) : (
        <PlanEmptyState handleClick={onOpen} />
      )}
      <CreatePlan isOpen={isOpen} onClose={onClose} projectId={projectId} />
    </Box>
  );
};

const PlanList = ({
  plans,
  projectId,
  envKey,
}: {
  plans: Plan[];
  projectId: string;
  envKey: string;
}) => (
  <Box border="1px" borderColor="gray.200" rounded="6px" mt={8}>
    {plans.map((plan) => (
      <PlanListItem
        plan={plan}
        key={plan.id}
        projectId={projectId}
        envKey={envKey}
      />
    ))}
  </Box>
);

const PlanListItem = ({
  plan,
  projectId,
  envKey,
}: {
  plan: Plan;
  projectId: string;
  envKey: string;
}) => (
  <Link href={`/${projectId}/${envKey}/plans/${plan.id}`} passHref>
    <a>
      <Box borderBottom="1px" borderColor="gray.200" p={4} cursor="pointer">
        <Box>
          <Box>
            <Heading fontSize="md">{plan.name}</Heading>
            <Text fontSize="sm" color="gray.600">
              {plan.description}
            </Text>
          </Box>
          <Tag size="sm" mt={2}>
            {plan.key}
          </Tag>
        </Box>
      </Box>
    </a>
  </Link>
);

const AddPlanButton = ({ handleClick }: { handleClick: () => void }) => (
  <Button onClick={handleClick} leftIcon={<AddIcon />}>
    New
  </Button>
);

const PlanEmptyState = ({ handleClick }: { handleClick: () => void }) => (
  <Flex
    h={`calc(100% - ${HEADER_HEIGHT}px)`}
    justifyContent="center"
    alignItems="center"
  >
    <Box textAlign="center">
      <Heading fontSize="lg">Create first plan</Heading>
      <AddPlanButton handleClick={handleClick} />
    </Box>
  </Flex>
);

PlansPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default PlansPage;
