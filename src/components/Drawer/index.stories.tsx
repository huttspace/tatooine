import { Button } from "@mantine/core";
import { Meta, Story } from "@storybook/react";
import { Drawer, Props } from "./";

export default {
  title: "components/Drawer",
  components: Drawer,
} as Meta;

const Template: Story<Props> = (args) => (
  <>
    <Button>Mantaine ui</Button>
    <Drawer {...args} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Header title",
  isOpen: true,
  onClose: () => {},
  children: <>body</>,
};
