import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SidebarView } from ".";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Views/SidebarView",
  component: SidebarView,
  argTypes: {
    color: { control: "color" },
  },
} as ComponentMeta<typeof SidebarView>;

const Template: ComponentStory<typeof SidebarView> = (args) => <Router><SidebarView {...args} /></Router>;

export const Primary = Template.bind({});
Primary.args = {

};
