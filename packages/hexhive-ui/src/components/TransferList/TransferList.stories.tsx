import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TransferList } from '.';
// import { BaseStyle } from '@hexhive/styles';
import { useState } from 'react';
import moment from 'moment';

export default {
  title: 'Components/Transfer List',
  component: TransferList,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof TransferList>;

const Template: ComponentStory<typeof TransferList> = (args) => {
  
 return <TransferList 
      {...args} 
       />
      ;
}

export const Primary = Template.bind({});
Primary.args = {
  options: [{id: '1', name: 'Test'}]
};
