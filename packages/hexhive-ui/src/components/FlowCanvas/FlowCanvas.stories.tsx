import React, { useEffect, useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextField } from "@mui/material";
import {
    FlowCanvas,
  FlowCanvasProps,
} from "./FlowCanvas";

export default {
  title: "Components/FlowCanvas",
  component: FlowCanvas,
} as Meta;

const ControlledTemplate: Story<FlowCanvasProps> = (args) => {
  return ((props) => {
    const [nodes, setNodes] = useState(args.nodes || []);
    const pathRef = useRef<any[]>(args.paths || []);
    const [paths, _setPaths] = useState(args.paths || []); //args.paths

    const setPaths = (items: any[]) => {
      pathRef.current = items;
      _setPaths(items);
    };

    return (
      <FlowCanvas
        {...args}
        nodes={nodes}
        paths={pathRef.current}
     
      >
      </FlowCanvas>
    );
  })(args);
};



const Template: Story<FlowCanvasProps> = (args) => (
  <FlowCanvas 
    {...args}>
  </FlowCanvas>
);

export const NodeOptions = Template.bind({});
NodeOptions.args = {
 
  nodes: [
    {
      id: "1",
    //   type: "action-node",
      position: {
        x: 20,
        y: 20,
      }
    },
    {
      id: "2",
    //   type: "icon-node",
      extras: {
        icon: "NavigateNext",
        color: "purple",
      },
      position: {
        x: 200,
        y: 20,
      }
    },
    {
      id: "3",
    //   type: "start-node",
      extras: {},
      position: {
        x: 300,
        y: 20,
      }
    },
  ],
};


export const NodeLinked = Template.bind({});
NodeLinked.args = {
 
  nodes: [
    {
      id: "1",
    //   type: "action-node",
      position: {
        x: 20,
        y: 20,
      }
    },
    {
      id: "2",
      type: "icon",
      data: {
        icon: "NavigateNext",
        color: "purple",
      },
      position: {
        x: 200,
        y: 20,
      }
    },
    {
      id: "3",
    //   type: "start-node",
      extras: {},
      position: {
        x: 300,
        y: 20,
      }
    },
  ],
  paths: [
    {
        id: '1',
        type: 'line',
        source: '2',
        target: '3',
        data: {
            points: [{x: 200, y: 200}]
        }
    }
  ]
};

