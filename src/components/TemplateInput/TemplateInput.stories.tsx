import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TemplateInput } from './TemplateInput';
import { Grommet } from 'grommet';
import { BaseStyle } from '@hexhive/styles';
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
 
 return <Grommet 
    style={{display: 'flex', flex: 1}}
    theme={BaseStyle}>
    <TemplateInput {...args} />
  </Grommet>;
}

export const Primary = Template.bind({});
Primary.args = {
  delimeter: `{{`
};
