import React, { useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Divider, TextField, Typography } from "@mui/material";
import {
  BlockTray, BlockTrayProps
} from ".";

export default {
  title: "Components/BlockTray",
  component: BlockTray,
} as Meta;

const ControlledTemplate: Story<BlockTrayProps> = (args) => {
  return ((props) => {
   
    return (
      <BlockTray
        {...args}
       />
    );
  })(args);
};


export const Primary = ControlledTemplate.bind({});
Primary.args = {
  blocks: [{label: "Block 1"}],
  renderItem: (block, ix) => <div>{block.label} - {ix}</div>
};



export const Grouped = ControlledTemplate.bind({});
Grouped.args = {
  blocks: [{label: "Block 1", parent: 101}, {label: "Block 2", parent: 101}, {label: "Block 202", parent: 102}] as any,
  renderHeader: (header) => <><div style={{display: 'flex', justifyContent: 'center'}}><Typography>{header}</Typography></div><Divider /></>,
  renderItem: (block, ix) => <div>{block.label} - {ix}</div>,
  groupBy: 'parent'
};

