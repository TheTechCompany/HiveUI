import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Text } from 'grommet';
import { DateInput } from './DateInput';

export default {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = (args) => {
    const [ date, setDate ] = useState<string>();

    return <Box direction='column'>
        <DateInput value={date} onChange={(date) => setDate(date)} {...args} />
      </Box>
};

export const Primary = Template.bind({});
Primary.args = {

};