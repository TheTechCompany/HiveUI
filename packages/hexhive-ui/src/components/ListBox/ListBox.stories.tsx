import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from '@mui/material';
import { ListBox } from './ListBox';

export default {
  title: 'Components/ListBox',
  component: ListBox,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  header: (<Typography>Header</Typography>),
  data: [{name: "Item"}],
  renderItem: (item: any) => <Typography>{item.name}</Typography>,
};

export const OnlyClick = Template.bind({});
OnlyClick.args = {
  header: (<Typography>Header</Typography>),
  data: [{name: "Item"}],
  renderItem: (item: any) => <Typography>{item.name}</Typography>,
  onEditItem: null
};

export const OnlyEdit = Template.bind({});
OnlyEdit.args = {
  header: (<Typography>Header</Typography>),
  data: [{name: "Item"}],
  renderItem: (item: any) => <Typography>{item.name}</Typography>,
  onClickItem: null
};