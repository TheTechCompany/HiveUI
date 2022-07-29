import React, { useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
    FileDialog, 
    FileDialogProps
} from ".";

export default {
  title: "Modals/File Preview",
  component: FileDialog,
} as Meta;


const Template: Story<FileDialogProps> = (args) => (
  <FileDialog {...args} />
);

export const OpenModal = Template.bind({});
OpenModal.args = {
    open: true,
    onDownload: () => {
        alert("Download file");
    },
    files: [{
        name: 'google_001.jpg',
        url: "https://cdn.vox-cdn.com/thumbor/7B9g_99xn568t3xDpzkMP7VRI6o=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22215403/acastro_210104_1777_google_0001.jpg",
        mimeType: 'image/jpeg',
        timestamp: new Date(),
        owner: {
            name: 'Tester'
        }
    }]
}
