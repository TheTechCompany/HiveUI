import React, { useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextInput } from "grommet";
import path from 'path'

import {
    FileExplorer, FileExplorerProps
} from "./FileExplorer";

export default {
  title: "Components/FileExplorer",
  component: FileExplorer,
} as Meta;


const Template: Story<FileExplorerProps> = (args) => {
  const [ strPath, setPath ] = useState('');

  return <FileExplorer  
          {...args} 
          onNavigate={(id) => {
            setPath(id)
            args.onNavigate?.(id)
          }}
          path={strPath}  />
};

export const Files = Template.bind({});
Files.args = {
    files: [
        {name: 'Test.pdf', size: 22000},
        {name: 'Test.pdf', size: 22000},
    ]
}

export const FileActions = Template.bind({})
FileActions.args = {
  files: [
    {name: 'Test.pdf', size: 2200},
  ],
  actions: [
    {key: 'download', label: 'Download', onClick: (file) => console.log("Download", file)},
    {key: 'delete', label: "Delete", onClick: (file) => {}, sx: {color: 'red'}, seperator: 'top'}
  ]
}

export const Folders = Template.bind({});
Folders.args = {
  onNavigate: (id) => console.log({id}),
  files: [
    {id: 'folder', name: 'Folder', isFolder: true},
  ],
  refetchFiles: (path) => {
    console.log({path})
    return [];
  }
}
export const Uploads = Template.bind({});
Uploads.args = {
    files: [
        {name: 'Test.pdf', size: 22000},
        {name: 'Test.pdf', size: 22000},
        {name: 'Test.pdf', size: 22000}
    ],
    uploading: [
      {name: 'File', percent: 20}
    ]
}