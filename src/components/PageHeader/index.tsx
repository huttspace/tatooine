import { Text, Title, Stack, Container, Box, Grid } from "@mantine/core";
import { ReactNode } from "react";

export type Props = {
  title: string;
  description?: string;
  rightAlignedComponent?: ReactNode;
};

export const PageHeader = ({
  title,
  description,
  rightAlignedComponent,
}: Props) => (
  <Grid
    p={0}
    m={0}
    sx={{ width: "100%" }}
    justify="space-between"
    align="center"
  >
    <Stack spacing={4}>
      <Title size="h3">{title}</Title>
      {description && (
        <Text size="sm" color="gray">
          {description}
        </Text>
      )}
    </Stack>
    <Container fluid={true} m={0} p={0}>
      {rightAlignedComponent && rightAlignedComponent}
    </Container>
  </Grid>
);
