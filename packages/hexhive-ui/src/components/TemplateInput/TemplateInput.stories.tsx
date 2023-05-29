import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TemplateInput } from './TemplateInput';
import { useState } from 'react';
import moment from 'moment';

export default {
  title: 'Components/TemplateInput',
  component: TemplateInput,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof TemplateInput>;

const Template: ComponentStory<typeof TemplateInput> = (args) => {
 
 return  <TemplateInput {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {
  // delimeter: `{{`
  options: [
    {label: 'msg.payload.id', type: 'keyword'}
  ]
};
