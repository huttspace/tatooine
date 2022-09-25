import { Button } from "@chakra-ui/react";
import { Story, Meta } from "@storybook/react";
import { PageHeader, Props } from "./";

export default {
  title: "components/PageHeader",
  components: PageHeader,
} as Meta;

const Template: Story<Props> = (args) => <PageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Title",
  description: "This is description.",
};

export const WithRightChildren = Template.bind({});
WithRightChildren.args = {
  title: "Title",
  description: "This is description.",
  rightAlignedComponent: <Button colorScheme='green'>CTA</Button>,
};
