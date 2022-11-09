import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InfiniteScrubber } from "./index";

export default {
  title: "Components/InfiniteScrubber",
  component: InfiniteScrubber,
} as ComponentMeta<typeof InfiniteScrubber>;

const Template: ComponentStory<typeof InfiniteScrubber> = (args) => {
  const [ date, setDate ] = useState(new Date().getTime());

  return <InfiniteScrubber 
            {...args}
            time={date}
            onTimeChange={(time) => {
              console.log({time})
              setDate(time)
            }}
             />
};  

export const Primary = Template.bind({});
Primary.args = {
  time: new Date().getTime()
};

export const WithControls = Template.bind({});
WithControls.args = {
  time: new Date().getTime(),
  controls: true,
};

export const WithScale = Template.bind({});
WithScale.args = {
  time: new Date().getTime(),
  controls: true,
  scale: 'quarter-hour'
};
