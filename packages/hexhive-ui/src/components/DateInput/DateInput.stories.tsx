import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/material';
import { DateInput } from './DateInput';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = (args) => {
    const [ date, setDate ] = useState<string>();

    return <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateInput {...args}  value={date} onChange={(date) => { 
          console.log({date})
          setDate(date)
        
        }}/>
        </LocalizationProvider>
      </Box>
};

export const Primary = Template.bind({});
Primary.args = {
  format: 'DD/MM/yyyy'
};