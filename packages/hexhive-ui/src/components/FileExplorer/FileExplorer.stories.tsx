import React, { useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import path from 'path'

import {
    FileExplorer, FileExplorerProps
} from "./FileExplorer";
import { Download } from "@mui/icons-material";

export default {
  title: "Components/FileExplorer",
  component: FileExplorer,
} as Meta;


const Template: Story<FileExplorerProps> = (args) => {
  const [ strPath, setPath ] = useState('');

  const [ selected, setSelected ] = useState<any[]>([]);

  return <FileExplorer  
          {...args} 
          onNavigate={(id) => {
            setPath(id)
            args.onNavigate?.(id)
          }}
          selected={selected}
          onSelectionChange={(selected) => {
            setSelected(selected)
          }}
          path={strPath}  />
};

export const Files = Template.bind({});
Files.args = {
    files: [
        {name: 'Test.pdf', size: 22000},
        {name: 'Test.pdf', size: 22000},
    ],
    loading: true,
    onCreateFolder: async () => {
      await new Promise((resolve) => setTimeout(() => resolve(true), 2000))
    }
}

export const FileActions = Template.bind({})
FileActions.args = {
  onDelete: async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000)
    })
  },
  files: [
    {id: '1', name: 'Test.pdf', size: 2200},
  ],
  actions: [
    {key: 'download', icon: <Download />, label: 'Download', onClick: (file) => console.log("Download", file)},
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
        {id: '1', name: 'Test 1.pdf', size: 2000},
        {id: '2', name: 'Test 2.pdf', size: 22000},
        {id: '3', name: 'Test 3.pdf', size: 20}
    ],
    uploading: [
      {name: 'File', percent: 20}
    ]
}