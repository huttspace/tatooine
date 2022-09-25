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
import { ReactNode } from "react";
import type { DrawerProps } from "src/types";

export type Props = {
  title: string;
  children: ReactNode;
  cta: () => void;
} & DrawerProps;

export const Drawer = ({ onClose, isOpen, cta, children, title }: Props) => {
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
