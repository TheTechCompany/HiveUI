import React, { useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import {
    ScheduleModal, 
    ScheduleModalProps
} from ".";

export default {
  title: "Modals/Schedule Modal",
  component: ScheduleModal,
} as Meta;


const Template: Story<ScheduleModalProps> = (args) => (
  <ScheduleModal {...args} />
);

export const OpenModal = Template.bind({});
OpenModal.args = {
    open: true,
    projects: [{id: '101', name: 'Project 1'}]
}
