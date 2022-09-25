import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Drawer } from "src/components/Drawer";
import { createPlanInput, CreatePlanInput } from "src/lib/schema";
import { DrawerProps } from "src/typings";

export const CreatePlan = ({ isOpen, onClose }: DrawerProps) => {
  const form = useForm<CreatePlanInput>({
    resolver: zodResolver(createPlanInput),
    mode: "all",
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title='Create plan'
      cta={() => console.log}
    >
      <Box>
        <VStack>
          <FormControl isInvalid={!!form.formState.errors["name"]}>
            <FormLabel>Name</FormLabel>
            <Input {...form.register("name")} autoFocus={true} />
            <FormErrorMessage>
              {form.formState.errors["name"] &&
                form.formState.errors["name"].message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!form.formState.errors["key"]}>
            <FormLabel>key</FormLabel>
            <Input {...form.register("key")} />
            <FormErrorMessage>
              {form.formState.errors["key"] &&
                form.formState.errors["key"].message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
      </Box>
    </Drawer>
  );
};
