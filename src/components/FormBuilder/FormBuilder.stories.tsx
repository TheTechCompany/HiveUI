import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormBuilder } from './FormBuilder';
import { Grommet } from 'grommet';
import { BaseStyle } from '@hexhive/styles';
import { useState } from 'react';
import moment from 'moment';

export default {
  title: 'Components/FormBuilder',
  component: FormBuilder,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof FormBuilder>;

const Template: ComponentStory<typeof FormBuilder> = (args) => {
    const [ form, setForm ] = useState<any[]>(args.form || [])

 return <Grommet 
    style={{display: 'flex', flex: 1}}
    theme={BaseStyle}>
    <FormBuilder 
      {...args}  
      form={form}
        onFormChange={(form) => setForm(form)}
        />
  </Grommet>;
}

export const Primary = Template.bind({});
Primary.args = {
};


export const WithItems = Template.bind({});
WithItems.args = {
    form: [
        {
            type: 'TextField'
        }, 
        {
            type: 'Select'
        }
    ]
};
