import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  useDisclosure,
  Flex,
  Heading,
  Spinner,
  Tag,
  Text,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPageWithLayout } from "next";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PageHeader } from "src/components/";
import { Drawer } from "src/components/Drawer";
import { useParams } from "src/hooks/useParams";
import { AppLayout } from "src/layouts";
import { CreateFeatureInput, createPlanInput } from "src/lib/schema";
import { DrawerProps } from "src/typings";
import { trpc } from "src/utils/trpc";

const HEADER_HEIGHT = 64;

const FeaturesPage: NextPageWithLayout = () => {
  const projectId = useParams("projectId");

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Box w="full">
      <PageHeader
        title="Features"
        description="This is features page"
        rightAlignedComponent={
          <Box>
            <AddFeatureButton handleClick={onOpen} />
          </Box>
        }
      />
      <CreateFeature onClose={onClose} isOpen={isOpen} projectId={projectId} />
    </Box>
  );
};

const defaultValues: Omit<CreateFeatureInput, "projectId"> = {
  name: "",
  key: "",
  description: "",
  featureType: "bool",
  bool: null,
  limitRate: null,
};

type FeatureTypes = Pick<CreateFeatureInput, "featureType">;

const FEATURE_TYPES: { [key in FeatureTypes["featureType"]]: string } = {
  bool: "Boolean",
  dailyLimit: "Daily limit",
  monthlyLimit: "Monthly Limit",
};

const CreateFeature = ({
  onClose,
  isOpen,
  projectId,
}: DrawerProps & { projectId: string }) => {
  const form = useForm<CreateFeatureInput>({
    resolver: zodResolver(createPlanInput),
    mode: "all",
    defaultValues: {
      ...defaultValues,
      projectId,
    },
  });

  const { mutateAsync, isLoading } = trpc.features.create.useMutation({
    onSuccess() {
      onClose();
      form.reset({ ...defaultValues, projectId });
    },
    onError({ data }) {
      if (data?.code === "CONFLICT") {
        const key = form.getValues("key");
        form.setError("key", {
          message: `Key name ${key} already use another feature`,
        });
      }
    },
  });

  const handleSubmit: SubmitHandler<
    CreateFeatureInput
  > = async (/* data */) => {
    // FIXME: featureType defect at args data
    const values = form.getValues();
    await mutateAsync({
      ...values,
      bool: false,
      limitRate: null,
    });
  };

  const featureTypes = useMemo(() => {
    return Object.keys(FEATURE_TYPES).map((key) => ({
      key,
      value: FEATURE_TYPES[key as FeatureTypes["featureType"]],
    }));
  }, []);
  console.log(form.formState.errors);

  return (
    <Drawer
      isDone={false}
      isOpen={isOpen}
      onClose={onClose}
      title="Create new feature"
      cta={form.handleSubmit(handleSubmit)}
    >
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
          <FormLabel>Key</FormLabel>
          <Input {...form.register("key")} />
          <FormErrorMessage>
            {form.formState.errors["key"] &&
              form.formState.errors["key"].message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea {...form.register("description")} />
          <FormErrorMessage>
            {form.formState.errors["description"] &&
              form.formState.errors["description"].message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Feature type</FormLabel>
          <RadioGroup
            onChange={(e) =>
              form.setValue("featureType", e as FeatureTypes["featureType"])
            }
            value={form.watch("featureType")}
          >
            <Stack direction="row">
              {featureTypes.map((type) => (
                <Radio value={type.key} key={type.key}>
                  {type.value}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      </VStack>
    </Drawer>
  );
};

const AddFeatureButton = ({ handleClick }: { handleClick: () => void }) => (
  <Button onClick={handleClick} leftIcon={<AddIcon />}>
    New
  </Button>
);

FeaturesPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FeaturesPage;
