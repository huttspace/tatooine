import { Meta, Story } from "@storybook/react";
import { CreatePlan } from "./";
import { DrawerProps } from "src/types/";

export default {
  title: "features/plans/CreatePlan",
  component: CreatePlan,
} as Meta;

const Template: Story<DrawerProps> = (args) => <CreatePlan {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  onClose: () => {},
};
