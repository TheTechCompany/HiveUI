import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FileViewer } from "./FileViewer";

export default {
  title: "Components/FileViewer",
  component: FileViewer,
  argTypes: {
    color: { control: "color" },
  },
} as ComponentMeta<typeof FileViewer>;

const Template: ComponentStory<typeof FileViewer> = (args) => {

  const [ index, setIndex ] = useState(0);

  return <FileViewer {...args} index={index} onChange={(idx) => setIndex(idx)}  />
};

export const Primary = Template.bind({});
Primary.args = {
  files: [
    {
      url: "https://picsum.photos/200/300",
      extension: "pdf",
      mimeType: 'image/png',
    },
    {
      url: "./test",
      mimeType: 'application/pdf',
      extension: "pdf",
    },
  ],
};

export const WithFiles = Template.bind({});
WithFiles.args = {
  files: [
    {
      url: "./test",
      extension: "pdf",
    },
  ],
};
