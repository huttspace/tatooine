import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import type { DrawerProps } from "src/typings";

export type Props = {
  title: string;
  children: ReactNode;
  cta: () => void;
  isDone: boolean;
} & DrawerProps;

export const Drawer = ({
  onClose,
  isOpen,
  cta,
  children,
  title,
  isDone,
}: Props) => {
  useEffect(() => {
    if (isDone) onClose();
  }, [isDone, onClose]);

  return (
    <ChakraDrawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' onClick={cta}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
};
