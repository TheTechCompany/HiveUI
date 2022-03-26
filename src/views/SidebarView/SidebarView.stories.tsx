import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Add } from 'grommet-icons';
import { SidebarView } from ".";
import { HashRouter as Router } from "react-router-dom";

export default {
  title: "Views/SidebarView",
  component: SidebarView,
  argTypes: {
    color: { control: "color" },
  },
} as ComponentMeta<typeof SidebarView>;

const Template: ComponentStory<typeof SidebarView> = (args) => (
  <Router>
    <SidebarView 
      {...args} />
  </Router>
);

const Item1 = () => {
  return (
    <div>Item 1</div>
  )
}

export const Primary = Template.bind({});
Primary.args = {
  menu: [
    {
      label: 'Item',
      icon: <Add />, 
      path: 'item',
      component: <Item1 />
    },
    {
      label: 'Item 2',
      icon: <Add />,
      path: 'item2',
      component: <Item1 />
    }
  ]
};
