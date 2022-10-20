import { Text, Title, Stack, Container, Box } from "@mantine/core";
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
  <Container fluid={true} p={0}>
    <Stack spacing={4}>
      <Title size="h2">{title}</Title>
      {description && (
        <Text size="sm" color="gray">
          {description}
        </Text>
      )}
    </Stack>
    <Container>{rightAlignedComponent && rightAlignedComponent}</Container>
  </Container>
);
