import type { UseDisclosureProps } from "@chakra-ui/react";

export type DrawerProps = Required<
  Pick<UseDisclosureProps, "isOpen" | "onClose">
>;
