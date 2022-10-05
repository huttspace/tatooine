import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Drawer } from "src/components/Drawer";
import { createPlanInput, CreatePlanInput } from "src/lib/schema";
import { DrawerProps } from "src/typings";
import { trpc } from "src/utils/trpc";

type Props = { projectId: string } & DrawerProps;

export const CreatePlan = ({ isOpen, onClose, projectId }: Props) => {
  const { mutateAsync, isLoading, isSuccess } = trpc.plans.create.useMutation();

  const form = useForm<CreatePlanInput>({
    resolver: zodResolver(createPlanInput),
    mode: "all",
    defaultValues: { projectId },
  });

  const handleSubmit: SubmitHandler<CreatePlanInput> = async (data) =>
    await mutateAsync(data).then(() =>
      form.reset({ name: "", key: "", projectId }),
    );

  return (
    <Drawer
      isDone={isSuccess}
      isOpen={isOpen}
      onClose={onClose}
      title='Create plan'
      cta={form.handleSubmit(handleSubmit)}
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
