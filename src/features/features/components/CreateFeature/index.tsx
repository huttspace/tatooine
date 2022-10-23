import {
  Drawer,
  Button,
  Group,
  TextInput,
  Textarea,
  Radio,
  Stack,
  Grid,
} from "@mantine/core";
import { useForm, zodResolver, UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import { createFeatureInput, CreateFeatureInput } from "src/lib/schema";
import { trpc } from "src/utils/trpc";

type Form = UseFormReturnType<CreateFeatureInput>;

type Props = {
  projectId: string;
  envKey: string;
  onClose: () => void;
  opened: boolean;
};

export type PresenterProps = {
  opened: boolean;
  onClose: () => void;
  form: Form;
  featureTypes: { key: string; value: string }[];
  handelSubmit: (data: CreateFeatureInput) => void;
  isLoadingCreateFeature: boolean;
};

type FeatureTypes = Pick<CreateFeatureInput, "featureType">;

const FEATURE_TYPES: { [key in FeatureTypes["featureType"]]: string } = {
  bool: "Boolean",
  dailyLimit: "Daily limit",
  monthlyLimit: "Monthly Limit",
};

export const useHooks = ({
  projectId,
  envKey,
}: {
  projectId: string;
  envKey: string;
}) => {
  const form = useForm<CreateFeatureInput>({
    validate: zodResolver(createFeatureInput),
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      projectId,
      featureType: "bool",
      name: "",
      key: "",
      description: "",
    },
  });

  const utils = trpc.useContext();
  const {
    mutateAsync,
    isLoading: isLoadingCreateFeature,
    isSuccess: isSuccessCreateFeature,
  } = trpc.features.create.useMutation({
    onSuccess() {
      utils.features.list.invalidate({ projectId, envKey });
      form.reset();
    },
    onError({ data }) {
      if (data?.code === "CONFLICT") {
        const { key } = form.values;
        form.setErrors({
          key: `Key name ${key} already use another feature`,
        });
      }
    },
  });

  const handelSubmit = async (data: CreateFeatureInput) =>
    await mutateAsync(data);

  const featureTypes = useMemo(() => {
    return Object.keys(FEATURE_TYPES).map((key) => ({
      key,
      value: FEATURE_TYPES[key as FeatureTypes["featureType"]],
    }));
  }, []);

  return {
    form,
    featureTypes,
    handelSubmit,
    isLoadingCreateFeature,
    isSuccessCreateFeature,
  };
};

export const CreateFeature = ({ projectId, envKey, ...props }: Props) => {
  const { isSuccessCreateFeature, ...data } = useHooks({ projectId, envKey });

  useEffect(() => {
    if (isSuccessCreateFeature) props.onClose();
  }, [isSuccessCreateFeature]);

  return <CreateFeaturePresenter {...props} {...data} />;
};

export const CreateFeaturePresenter = ({
  opened,
  onClose,
  form,
  featureTypes,
  handelSubmit,
  isLoadingCreateFeature,
}: PresenterProps) => (
  <Drawer
    opened={opened}
    onClose={onClose}
    title="Register"
    padding="xl"
    size="xl"
    position="right"
  >
    <form onSubmit={form.onSubmit(handelSubmit)} style={{ height: "100%" }}>
      <Stack
        justify="space-between"
        align="stretch"
        sx={{ height: "calc(100% - 48px)" }}
      >
        <Stack>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Awesome feature name"
            data-autofocus
            {...form.getInputProps("name")}
            sx={{ borderRadius: "4px" }}
          />

          <TextInput
            withAsterisk
            label="Key"
            placeholder="feature_key"
            {...form.getInputProps("key")}
            sx={{ borderRadius: "4px" }}
          />

          <Textarea label="Description" />

          <Radio.Group
            label="Feature type"
            withAsterisk
            value={form.values.featureType}
            onChange={(value) =>
              form.setValues({
                featureType: value as FeatureTypes["featureType"],
              })
            }
          >
            {featureTypes.map((featureType) => (
              <Radio
                key={featureType.key}
                value={featureType.key}
                label={featureType.value}
              />
            ))}
          </Radio.Group>
        </Stack>

        <Group position="right">
          <Button size="sm" color="gray" variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="dark"
            type="submit"
            loading={isLoadingCreateFeature}
          >
            Add
          </Button>
        </Group>
      </Stack>
    </form>
  </Drawer>
);
