import {
  Box,
  Loader,
  Container,
  Table,
  Input,
  Button,
  Text,
  Badge,
  Stack,
  NumberInput,
  Switch,
  Grid,
} from "@mantine/core";
import type { NextPageWithLayout } from "next";
import Link from "next/link";
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
      <PageHeader
        title={plan.name}
        description={plan.description}
        rightAlignedComponent={
          <Button color="dark" size="sm" radius="md">
            Save
          </Button>
        }
      />
      <Table verticalSpacing="md" mt={24} highlightOnHover>
        <tbody>
          {plan.features.map((feature) => (
            <tr key={feature.name}>
              <td>
                <Stack align="flex-start" spacing={4}>
                  <Link
                    href={`/${projectId}/${envKey}/features/${feature.id}`}
                    passHref
                  >
                    <Text component="a" size="md" weight={500}>
                      {feature.name}
                    </Text>
                  </Link>
                  <Badge radius="sm" size="sm" color="gray">
                    {feature.key}
                  </Badge>
                </Stack>
              </td>
              <td>
                <Badge size="md">{feature.featureType}</Badge>
              </td>
              <td>
                <Grid justify="flex-end">
                  {feature.featureType !== "bool" ? (
                    <NumberInput defaultValue={Number(feature.value)} />
                  ) : (
                    <Switch size="md" color="dark" />
                  )}
                </Grid>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

PlanPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default PlanPage;
