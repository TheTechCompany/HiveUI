import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from 'grommet';
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
  header: (<Text>Header</Text>),
  data: [{name: "Item"}],
  renderItem: (item: any) => <Text>{item.name}</Text>,
};

export const OnlyClick = Template.bind({});
OnlyClick.args = {
  header: (<Text>Header</Text>),
  data: [{name: "Item"}],
  renderItem: (item: any) => <Text>{item.name}</Text>,
  onEditItem: null
};

export const OnlyEdit = Template.bind({});
OnlyEdit.args = {
  header: (<Text>Header</Text>),
  data: [{name: "Item"}],
  renderItem: (item: any) => <Text>{item.name}</Text>,
  onClickItem: null
};