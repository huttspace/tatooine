import { Story, Meta } from "@storybook/react";
import { CreateFeaturePresenter, PresenterProps, useHooks } from "./";

export default {
  title: "features/features/CreateFeature",
  components: CreateFeaturePresenter,
} as Meta;

const Template: Story<PresenterProps> = (args) => {
  const props = useHooks({ projectId: "" });
  return <CreateFeaturePresenter {...args} {...props} />;
};

export const Basic = Template.bind({});
Basic.args = {
  onClose: () => {},
  opened: true,
};
