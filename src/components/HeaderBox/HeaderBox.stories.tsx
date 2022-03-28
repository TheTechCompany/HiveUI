import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from 'grommet';
import { HeaderBox } from './HeaderBox';

export default {
  title: 'Components/HeaderBox',
  component: HeaderBox,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof HeaderBox>;

const Template: ComponentStory<typeof HeaderBox> = (args) => <HeaderBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  header: (<Text>Header</Text>),
};
