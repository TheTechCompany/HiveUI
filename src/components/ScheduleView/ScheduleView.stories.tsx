import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ScheduleView } from './ScheduleView';
import { Grommet } from 'grommet';
import { BaseStyle } from '@hexhive/styles';
import { useState } from 'react';
import moment from 'moment';
import { nanoid } from 'nanoid';

export default {
  title: 'Components/ScheduleView',
  component: ScheduleView,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof ScheduleView>;

const Template: ComponentStory<typeof ScheduleView> = (args) => {
 
 return <Grommet 
    style={{display: 'flex', flex: 1}}
    theme={BaseStyle}>
    <ScheduleView {...args} />
  </Grommet>;
}

export const Primary = Template.bind({});

Primary.args = {
    actions: {
        left: (
            <div>
                menu
            </div>
        ),
        right:  null
    },
    events: [
        {
            id: nanoid(),
            date: new Date(),
            project: {
                displayId: '1',
                id: nanoid(),
                name:  'Event 1',
            },
            notes: []
        }
    ]
};
