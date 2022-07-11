import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Kanban } from "./Kanban";
import { Box } from "@mui/material";

export default {
  title: "Components/Kanban",
  component: Kanban,
  argTypes: {
    color: { control: "color" },
  },
} as ComponentMeta<typeof Kanban>;

const Template: ComponentStory<typeof Kanban> = (args) => <Kanban {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  columns: [{ id: "1", title: "column", rows: [] }],
};

export const WithCards = Template.bind({});
WithCards.args = {
  columns: [
    {
      id: "1",
      title: "column",
      rows: [
        {
          id: '2',
          name: "two",
        },
      ],
    },
    {
      id: "2",
      title: "column2",
      rows: [
        {
          id: '3',
          name: "three",
        },
        { 
          id: '4',
          name: "fsdf",
        },
      ],
    },
  ],
  onCreateColumn: () => {},
  renderCard: (item: any) => <Box>{item.name}</Box>,
};
