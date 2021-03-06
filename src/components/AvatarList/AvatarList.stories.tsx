import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AvatarList } from "./index";

export default {
  title: "Components/AvatarList",
  component: AvatarList,
} as ComponentMeta<typeof AvatarList>;

const Template: ComponentStory<typeof AvatarList> = (args) => (
  <AvatarList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  users: [
    { name: "John Doe", color: "red" },
    { name: "Bob Jones", color: "blue" },
  ],
  size: 48,
};
