import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Story, Meta } from "@storybook/react";
import { CreateFeaturePresenter, PresenterProps, useHooks } from "./";

export default {
  title: "features/features/CreateFeature",
  components: CreateFeaturePresenter,
} as Meta;

const Template: Story<PresenterProps> = (args) => {
  const props = useHooks({ projectId: "", envKey: "" });
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <>
      <Button onClick={open}>Open</Button>
      <CreateFeaturePresenter
        {...args}
        {...props}
        opened={opened}
        onClose={close}
      />
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
