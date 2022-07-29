import React, { useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import path from 'path'
import { HexHiveTheme } from '@hexhive/styles'

import {
    FileExplorerModal, FileExplorerModalProps
} from "./FileExplorerModal";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Modals/File Explorer Modal",
  component: FileExplorerModal,
} as Meta;


const Template: Story<FileExplorerModalProps> = (args) => {
  const [ path, setPath ] = useState('/');

  return <ThemeProvider theme={HexHiveTheme}>
    <FileExplorerModal  
          {...args} 
          path={path}
          onPathChange={(path) => {
            setPath(path)
          }}
        open={true}

          />
          </ThemeProvider>
};

export const Files = Template.bind({});
Files.args = {
    files: [
        {name: 'Test.pdf', size: 22000},
        {name: 'Test.pdf', size: 22000},
        {name: 'Folder', isFolder: true, size: 1}
    ]
}

export const FileActions = Template.bind({})
FileActions.args = {
  files: [
    {name: 'Test.pdf', size: 2200},
  ],
  onSubmit: async (path: string) => {
    console.log(path)
    await new Promise((resolve) => setTimeout(() => resolve(true), 1000))
  }
}