import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormControl } from './FormControl';
import { useState } from 'react';
import moment from 'moment';

export default {
  title: 'Components/Form Control',
  component: FormControl,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof FormControl>;

const Template: ComponentStory<typeof FormControl> = (args) => {

 return <FormControl 
      {...args}  
     
        />;
}

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Placeholder',
  options: [
    {
      id: '1',
      label: 'Option 1'
    }
  ],
  valueKey: 'id',
  labelKey: 'label',
};

