import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ScheduleView } from './ScheduleView';
import { useState } from 'react';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default {
  title: 'Components/ScheduleView',
  component: ScheduleView,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof ScheduleView>;

const Template: ComponentStory<typeof ScheduleView> = (args) => {
 
 return     <ScheduleView {...args} />;
}

export const Primary = Template.bind({});

Primary.args = {
    actions: {
        left: (
            <IconButton>
                <Menu />
            </IconButton>
        ),
        right:  null
    },
    events: [
        {
            id: nanoid(),
            date: new Date(2022, 6, 9),
            project: {
                displayId: '1',
                id: nanoid(),
                name:  'Event 1',
            },
            notes: ["asdf"],
            owner: {id: '101', name: 'Pete'},
            managers: [{id: '102', name: "John"}]
        },
        {
            id: nanoid(),
            date: new Date(),
            project: {
                displayId: '1',
                id: nanoid(),
                name:  'Event 1',
            },
            notes: [],
            createdAt: new Date(),
            owner: {id: '101', name: 'Pete'},
        }
    ]
};
