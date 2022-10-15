import { Spinner } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import { PageHeader } from "src/components";
import { useParameters } from "src/hooks/useParams";
import { AppLayout } from "src/layouts";
import { trpc } from "src/utils/trpc";

const PlanPage: NextPageWithLayout = () => {
  const [projectId, envKey, planId] = useParameters([
    "projectId",
    "envKey",
    "planId",
  ]);

  const { data: plan, isLoading: isLoadingPlan } = trpc.plans.single.useQuery({
    planId,
    envKey,
    projectId,
  });

  if (isLoadingPlan) return <Spinner />;
  if (!plan) return null;

  return (
    <Box>
      <PageHeader title={plan.name} description={plan.description} />
      <Box>
        {plan.features.map((feature) => (
          <Box key={feature.id}>{feature.name}</Box>
        ))}
      </Box>
    </Box>
  );
};

PlanPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default PlanPage;
