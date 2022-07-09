import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from '@mui/material';
import { LightBox } from './LightBox';

export default {
  title: 'Components/LightBox',
  component: LightBox,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof LightBox>;

const Template: ComponentStory<typeof LightBox> = (args) => {

  const [ zoom, setZoom ] = useState(1);
  const [ rotate, setRotate ] = useState(0);

  return <LightBox 
              {...args} 
              zoom={zoom}
              rotation={rotate}
              onZoom={(z) => setZoom(z)}
              onRotate={(r) => setRotate(r)} />
};

export const Primary = Template.bind({});
Primary.args = {
  
};
