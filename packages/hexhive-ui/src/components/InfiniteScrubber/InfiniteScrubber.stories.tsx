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
              console.log("time change", time)
              setDate(time)
            }}
             />
};  

export const Primary = Template.bind({});
Primary.args = {
  time: new Date().getTime()
};
