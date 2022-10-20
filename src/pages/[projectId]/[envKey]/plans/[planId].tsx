import { Box, Loader, Container } from "@mantine/core";
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

  if (isLoadingPlan) return <Loader color="dark" size="lg" />;
  if (!plan) return null;

  return (
    <Container fluid={true} px={0}>
      <PageHeader title={plan.name} description={plan.description} />
      <Box>
        {plan.features.map((feature) => (
          <Box key={feature.id}>
            {feature.name}, {JSON.stringify(feature.value)}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

PlanPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default PlanPage;
