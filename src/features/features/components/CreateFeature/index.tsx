import {
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Flex,
  Text,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  FieldArrayWithId,
  UseFormReturn,
} from "react-hook-form";
import { Drawer } from "src/components/Drawer";
import { CreateFeatureInput, createPlanInput } from "src/lib/schema";
import { DrawerProps } from "src/typings";
import { trpc } from "src/utils/trpc";

const defaultValues: Omit<CreateFeatureInput, "projectId"> = {
  name: "",
  key: "",
  description: "",
  featureType: "bool",
  values: [],
};

type FeatureTypes = Pick<CreateFeatureInput, "featureType">;

const FEATURE_TYPES: { [key in FeatureTypes["featureType"]]: string } = {
  bool: "Boolean",
  dailyLimit: "Daily limit",
  monthlyLimit: "Monthly Limit",
};

export const CreateFeature = ({
  onClose,
  isOpen,
  projectId,
  envKey,
}: DrawerProps & { projectId: string; envKey: string }) => {
  const utils = trpc.useContext();
  const { data: plans } = trpc.plans.list.useQuery({ projectId, envKey });

  const form = useForm<CreateFeatureInput>({
    resolver: zodResolver(createPlanInput),
    mode: "all",
    defaultValues: {
      ...defaultValues,
      projectId,
    },
  });

  const { fields } = useFieldArray({ control: form.control, name: "values" });

  useEffect(() => {
    if (plans)
      form.setValue(
        "values",
        plans.map((plan) => ({
          planId: plan.id,
          name: plan.name,
          value: false,
        })),
      );
  }, [plans, form]);

  const { mutateAsync, isLoading, isSuccess } =
    trpc.features.create.useMutation({
      onSuccess() {
        utils.features.list.invalidate();
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
    });
  };

  const featureTypes = useMemo(() => {
    return Object.keys(FEATURE_TYPES).map((key) => ({
      key,
      value: FEATURE_TYPES[key as FeatureTypes["featureType"]],
    }));
  }, []);

  if (!plans) return null;

  return (
    <Drawer
      isDone={isSuccess}
      isOpen={isOpen}
      onClose={onClose}
      title="Create new feature"
      cta={form.handleSubmit(handleSubmit)}
    >
      <VStack spacing={6}>
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

        <FormControl>
          <FormLabel>Plan Setting</FormLabel>
          <VStack align="stretch" divider={<Divider />}>
            {fields.map((field, index) =>
              form.watch("featureType") === "bool" ? (
                <BooleanInput
                  key={field.id}
                  field={field}
                  form={form}
                  index={index}
                />
              ) : (
                <LimitInput
                  key={field.id}
                  field={field}
                  form={form}
                  index={index}
                />
              ),
            )}
          </VStack>
        </FormControl>
      </VStack>
    </Drawer>
  );
};

type InputProps = {
  field: FieldArrayWithId<CreateFeatureInput>;
  form: UseFormReturn<CreateFeatureInput>;
  index: number;
};

const BooleanInput = ({ field, form, index }: InputProps) => {
  return (
    <Flex justify="space-between">
      <Text>{field.name}</Text>
      <Switch
        onChange={(e) =>
          form.setValue(`values.${index}.value`, e.target.checked)
        }
      />
    </Flex>
  );
};

const LimitInput = ({ field, form, index }: InputProps) => {
  return (
    <Flex justify="space-between">
      <Text>{field.name}</Text>
      <NumberInput
        defaultValue={0}
        onChange={(_, value) => form.setValue(`values.${index}.value`, value)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
};
