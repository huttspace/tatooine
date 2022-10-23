import {
  Container,
  Box,
  Text,
  Title,
  Badge,
  Button,
  Grid,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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

  const [opened, { close, open }] = useDisclosure(false);

  if (!features) return null;

  return (
    <Container fluid={true}>
      <PageHeader
        title="Features"
        description="This is features page"
        rightAlignedComponent={
          <Box>
            <AddFeatureButton handleClick={open} />
          </Box>
        }
      />
      {features.length ? (
        <FeatureList features={features} />
      ) : (
        <FeatureEmptyState handleClick={open} />
      )}
      <CreateFeature
        onClose={close}
        isOpen={opened}
        projectId={projectId}
        envKey={envKey}
      />
    </Container>
  );
};

const FeatureList = ({ features }: { features: Feature[] }) => (
  <Stack align="stretch" mt={40}>
    {features.map((feature) => (
      <FeatureListItem feature={feature} key={feature.id} />
    ))}
  </Stack>
);

const FeatureListItem = ({ feature }: { feature: Feature }) => (
  <Container
    fluid={true}
    p={24}
    m={0}
    sx={(theme) => ({
      border: `1px solid ${theme.colors.gray[2]}`,
      borderRadius: "4px",
    })}
  >
    <Link href="/" passHref>
      <a>
        <Box>
          <Title size="h">{feature.name}</Title>
          <Text>{feature.description}</Text>
        </Box>
        <Badge size="xs" color="gray" mt={2}>
          {feature.key}
        </Badge>
      </a>
    </Link>
  </Container>
);

const AddFeatureButton = ({ handleClick }: { handleClick: () => void }) => (
  <Button onClick={handleClick} color="dark">
    New
  </Button>
);

const FeatureEmptyState = ({ handleClick }: { handleClick: () => void }) => (
  <Grid
    sx={{ height: `calc(100% - ${HEADER_HEIGHT}px)` }}
    justify="center"
    align="center"
  >
    <Box>
      <Title>Create first feature</Title>
      <AddFeatureButton handleClick={handleClick} />
    </Box>
  </Grid>
);

FeaturesPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FeaturesPage;
