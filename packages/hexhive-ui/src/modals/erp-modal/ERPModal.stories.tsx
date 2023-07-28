import React, { useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import {
    ERPModal, 
    ERPModalProps
} from ".";

export default {
  title: "Modals/ERP",
  component: ERPModal,
} as Meta;


const Template: Story<ERPModalProps> = (args) => (
  <ERPModal {...args} />
);

export const OpenModal = Template.bind({});
OpenModal.args = {
    open: true,
    type: 'Projects',
    projects: [{id: '101', name: 'Project 1'}]
}
