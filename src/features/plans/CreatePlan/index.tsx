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
import { DrawerProps } from "src/typings";

const schema = z.object({
  name: z.string().min(1),
  key: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

export const CreatePlan = ({ isOpen, onClose }: DrawerProps) => {
  const form = useForm<Schema>({ resolver: zodResolver(schema), mode: "all" });

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
