import { Meta, Story } from "@storybook/react";
import { CreatePlan, Props } from "./";

export default {
  title: "features/plans/CreatePlan",
  component: CreatePlan,
} as Meta;

const Template: Story<Props> = (args) => <CreatePlan {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  onClose: () => {},
  projectId: "projectId",
};
