import React, { useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import path from 'path'
import { HexHiveTheme } from '@hexhive/styles'

import {
    DelayedSwitch, DelayedSwitchProps
} from "./DelayedSwitch";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Components/Delayed Switch",
  component: DelayedSwitch,
} as Meta;


const Template: Story<DelayedSwitchProps> = (args) => {
  const [ checked, setChecked ] = useState(true);

  return <ThemeProvider theme={HexHiveTheme}>
    <DelayedSwitch  
          {...args} 
            value={checked}
            onChange={(e) => {
                setTimeout(() => {
                    setChecked(e)
                }, 2000)
            }}
          />
          </ThemeProvider>
};

export const Files = Template.bind({});
Files.args = {
 
}
