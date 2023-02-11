import React, { useEffect, useRef, useState } from "react";
//import useState from 'storybook-addon-state'
import { Story, Meta, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextField } from "@mui/material";
import {
  InfiniteCanvas,
  InfiniteCanvasProps,
  ZoomControls,
} from "./InfiniteCanvas";
import {
  ActionNodeFactory,
  IconNodeFactory,
  StartNodeFactory,
} from "./components/nodes";
import { LinePathFactory } from "./components/paths/line-path";
import { PipePathFactory } from "./components/paths/pipe-path";

export default {
  title: "Components/InfiniteCanvas",
  component: InfiniteCanvas,
} as Meta;

const ControlledTemplate: Story<InfiniteCanvasProps> = (args) => {
  return ((props) => {
    const [nodes, setNodes] = useState(args.nodes || []);
    const pathRef = useRef<any[]>(args.paths || []);
    const [paths, _setPaths] = useState(args.paths || []); //args.paths

    const setPaths = (items: any[]) => {
      pathRef.current = items;
      _setPaths(items);
    };

    return (
      <InfiniteCanvas
        {...args}
        nodes={nodes}
        paths={pathRef.current}
        onNodeUpdate={(node) => {

          action("onNodesChanged");
          let p = nodes.slice();
          let p_ix = p.map((x) => x.id).indexOf(node.id);

          p[p_ix] = {
            ...p[p_ix],
            ...node,
          };

          setNodes(p);
          //setNodes(nodes)
        }}
        onPathCreate={(path) => {

          let p = pathRef.current.slice();
          path.type = 'pipe-path'
          p.push(path);
          setPaths(p);
          // action('onPathsChanged')
          // setPaths(paths)
        }}
        onPathUpdate={(path) => {
          let p = pathRef.current.slice();
          let p_ix = p.map((x) => x.id).indexOf(path.id);

          p[p_ix] = {
            ...p[p_ix],
            ...path,
          };

          setPaths(p);
        }}
      >
        <ZoomControls anchor={{ horizontal: "right", vertical: "bottom" }} />
      </InfiniteCanvas>
    );
  })(args);
};


const SelfControlledTemplate: Story<InfiniteCanvasProps> = (args) => {
  return ((props) => {
    const [nodes, setNodes] = useState(args.nodes || []);
    const pathRef = useRef<any[]>(args.paths || []);
    const [paths, _setPaths] = useState(args.paths || []); //args.paths

    const setPaths = (items: any[]) => {
      pathRef.current = items;
      _setPaths(items);
    };

    useEffect(() => {

      // setTimeout(() => {
        
      //   setNodes([
      //     {
      //       id: "1",
      //       type: "action-node",
      //       menu: (
      //         <div>
      //           <TextField label="Width" type="number" />
      //           <TextField label="Height" type="number" />
      //         </div>
      //       ),
      //       width: 150,
      //       height: 50,
      //       x: 500,
      //       y: 200,
      //     },
      //     {
      //       id: "2",
      //       type: "action-node",
      //       menu: (
      //         <div>
      //           <TextField label="Width" type="number" />
      //           <TextField label="Height" type="number" />
      //         </div>
      //       ),
      //       width: 150,
      //       height: 50,
      //       x: 500,
      //       y: 100,
      //     },
      //   ])
      //   setPaths([
      //     {
      //       id: "3",
      //       type: 'pipe-path',
      //       points: [], // [{ x: 420, y: 100 }, { x: 800, y: 100 }, {x: 800, y: 200}, {x: 900, y: 200}, {x: 900, y: 300}, {x: 1000, y: 300}, {x: 1000, y: 200}, {x: 1100, y: 200}, {x: 1100, y: 100}, {x: 1000, y: 100}, {x: 1000, y: 50}],
      //       source: "1",
      //       sourceHandle: "inlet",
      //       target: '2',
      //       targetHandle: 'outlet'
      //     },
      //   ])

      //   // setNodes([]);
      //   // setPaths([]);

      // }, 5000)

      // setTimeout(() => {
      //   setNodes([]);
      //   setPaths([]);
      // }, 2000)
    }, [])

    return (
      <InfiniteCanvas
        {...args}
        nodes={nodes}
        paths={pathRef.current}
        onNodeUpdate={(node) => {

          action("onNodesChanged");
          let p = nodes.slice();
          let p_ix = p.map((x) => x.id).indexOf(node.id);

          p[p_ix] = {
            ...p[p_ix],
            ...node,
          };

          setNodes(p);
          //setNodes(nodes)
        }}
        onPathCreate={(path) => {

          let p = pathRef.current.slice();
          path.type = 'pipe-path'
          p.push(path);
          setPaths(p);
          // action('onPathsChanged')
          // setPaths(paths)
        }}
        onPathUpdate={(path) => {
          let p = pathRef.current.slice();
          let p_ix = p.map((x) => x.id).indexOf(path.id);

          p[p_ix] = {
            ...p[p_ix],
            ...path,
          };

          setPaths(p);
        }}
      >
        <ZoomControls anchor={{ horizontal: "right", vertical: "bottom" }} />
      </InfiniteCanvas>
    );
  })(args);
};

const Template: Story<InfiniteCanvasProps> = (args) => (
  <InfiniteCanvas {...args}>
    <ZoomControls anchor={{ horizontal: "right", vertical: "bottom" }} />
  </InfiniteCanvas>
);

export const NodeOptions = Template.bind({});
NodeOptions.args = {
  editable: true,
  style: {
    background: "#fff8f2",
    lineColor: "gray",
    dotColor: 'gray',
    pathColor: 'blue'
  },
  factories: [
    ActionNodeFactory,
    IconNodeFactory,
    StartNodeFactory,

    // new ActionNodeFactory(),
    // new IconNodeFactory(),
    // new StartNodeFactory(),
  ],
  nodes: [
    {
      id: "1",
      type: "action-node",
      x: 20,
      y: 20,
    },
    {
      id: "2",
      type: "icon-node",
      extras: {
        icon: "NavigateNext",
        color: "purple",
      },
      x: 200,
      y: 20,
    },
    {
      id: "3",
      type: "start-node",
      extras: {},
      x: 300,
      y: 20,
    },
  ],
};

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  editable: true,
  factories: [ActionNodeFactory],
  nodes: [
    {
      id: "1",
      type: "action-node",
      x: 20,
      y: 20,
    },
  ],
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  grid: { width: 100, height: 100, divisions: 20 },
  // snapToGrid: true,
  editable: true,
  style: {
    background: 'lightgray',
    pathColor: 'blue',
    portColor: "gray",
    portDotColor: 'gray'
  },
  snapToGrid: true,
  factories: [ActionNodeFactory, IconNodeFactory, LinePathFactory, PipePathFactory],
  nodes: [
    {
      id: "1",
      type: "action-node",
      menu: (
        <div>
          <TextField label="Width" type="number" />
          <TextField label="Height" type="number" />
        </div>
      ),
      x: 371,
      y: 173,
    },
    {
      id: "2",
      type: "action-node",
      menu: <div></div>,
      x: 20,
      y: 100,
    },
    {
      id: "3",
      type: "icon-node",
      extras: {
        label: "Run",
        icon: "NavigateNext",
        color: "purple",
      },
      x: 200,
      y: 20,
    },
    {
      id: "5",
      type: "icon-node",
      extras: {
        icon: "NavigateNext",
        color: "purple",
      },
      x: 300,
      y: 20,
    },
  ],
  paths: [
    {
      id: "2",
      type: 'line',
      points: [{ x: 420, y: 100 }, { x: 100, y: 100 }, {x: 100, y: 200}, {x: 200, y: 200}],
      source: "1",
      sourceHandle: "inlet",
    },
    {
      id: "3",
      type: 'pipe-path',
      points: [{ x: 420, y: 100 }, { x: 800, y: 100 }, {x: 800, y: 200}, {x: 900, y: 200}, {x: 900, y: 300}, {x: 1000, y: 300}, {x: 1000, y: 200}, {x: 1100, y: 200}, {x: 1100, y: 100}, {x: 1000, y: 100}, {x: 1000, y: 50}],
      source: "1",
      sourceHandle: "inlet",
    },

    {
      id: '4',
      type: 'pipe-path',
      points: [],
      source: "1",
      sourceHandle: 'outlet',
      target: '2',
      targetHandle: 'inlet'
    }
  ],
};



export const Routed = ControlledTemplate.bind({});
Routed.args = {
  grid: { width: 100, height: 100, divisions: 5 },
  // snapToGrid: true,
  router: "JumpPointFinder",
  routerOptions: {
    heuristic: 'manhattan',
    allowDiagonal: false,
  },
  editable: true,
  style: {
    background: 'lightgray',
    pathColor: 'blue',
    portColor: "gray",
    portDotColor: 'gray'
  },
  snapToGrid: true,
  factories: [ActionNodeFactory, IconNodeFactory, LinePathFactory],
  nodes: [
    {
      id: "1",
      type: "action-node",
      menu: (
        <div>
          <TextField label="Width" type="number" />
          <TextField label="Height" type="number" />
        </div>
      ),
      x: 371,
      y: 173,
    },
    {
      id: "2",
      type: "action-node",
      menu: <div></div>,
      x: 20,
      y: 100,
    },
    {
      id: "3",
      type: "icon-node",
      extras: {
        label: "Run",
        icon: "NaviteNext",
        color: "purple",
      },
      x: 200,
      y: 20,
    },
    {
      id: "5",
      type: "icon-node",
      extras: {
        icon: "NavigateNext",
        color: "purple",
      },
      x: 300,
      y: 20,
    },
  ],
  paths: [
    {
      id: "2",
      points: [{ x: 100, y: 100 }],
      source: "1",
      sourceHandle: "inlet",
    }
  ],
};



export const Finite = ControlledTemplate.bind({});
Finite.args = {
  grid: { width: 100, height: 100, divisions: 5 },
  // snapToGrid: true,
  finite: true,
  router: "JumpPointFinder",
  routerOptions: {
    heuristic: 'manhattan',
    allowDiagonal: false,
  },
  editable: true,
  style: {
    background: 'lightgray',
    pathColor: 'blue',
    portColor: "gray",
    portDotColor: 'gray'
  },
  snapToGrid: true,
  factories: [ActionNodeFactory, IconNodeFactory, LinePathFactory],
  nodes: [
    {
      id: "1",
      type: "action-node",
      menu: (
        <div>
          <TextField label="Width" type="number" />
          <TextField label="Height" type="number" />
        </div>
      ),
      x: 371,
      y: 173,
    },
    {
      id: "2",
      type: "action-node",
      menu: <div></div>,
      x: 20,
      y: 100,
    },
    {
      id: "3",
      type: "icon-node",
      extras: {
        label: "Run",
        icon: "NaviteNext",
        color: "purple",
      },
      x: 200,
      y: 20,
    },
    {
      id: "5",
      type: "icon-node",
      extras: {
        icon: "NavigateNext",
        color: "purple",
      },
      x: 300,
      y: 20,
    },
  ],
  paths: [
    {
      id: "2",
      points: [{ x: 100, y: 100 }],
      source: "1",
      sourceHandle: "inlet",
    },
  ],
};


export const FitToBounds = ControlledTemplate.bind({});
FitToBounds.args = {
  grid: { width: 100, height: 100, divisions: 5 },
  // snapToGrid: true,
  fitToBounds: true,
  // finite: true,
  router: "JumpPointFinder",
  routerOptions: {
    heuristic: 'manhattan',
    allowDiagonal: false,
  },
  editable: true,
  style: {
    background: 'lightgray',
    pathColor: 'blue',
    portColor: "gray",
    portDotColor: 'gray'
  },
  // snapToGrid: true,
  factories: [ActionNodeFactory, IconNodeFactory, LinePathFactory],
  nodes: [
    {
      id: "1",
      type: "action-node",
      menu: (
        <div>
          <TextField label="Width" type="number" />
          <TextField label="Height" type="number" />
        </div>
      ),
      width: 150,
      height: 50,
      x: 371,
      y: 1000,
    },
    {
      id: "2",
      type: "action-node",
      menu: <div></div>,
      width: 150,
      height: 50,
      x: 20,
      y: 100,
    },
    {
      id: "3",
      type: "icon-node",
      extras: {
        label: "Run",
        icon: "NaviteNext",
        color: "purple",
      },
      width: 70,
      height: 70,
      x: 2000,
      y: 20,
    },
    {
      id: "5",
      type: "icon-node",
      extras: {
        icon: "NavigateNext",
        color: "purple",
      },
      x: 300,
      y: 100,
    },
  ],
  paths: [
    {
      id: "2",
      points: [{ x: 100, y: 100 }],
      source: "1",
      sourceHandle: "inlet",
    },
  ],
};



export const FitToBoundsControlled = ControlledTemplate.bind({});
FitToBoundsControlled.args = {
  grid: { width: 100, height: 100, divisions: 5 },
  // snapToGrid: true,
  fitToBounds: true,

  editable: true,
  style: {
    background: 'lightgray',
    pathColor: 'blue',
    portColor: "gray",
    portDotColor: 'gray'
  },
  snapToGrid: true,
  factories: [ActionNodeFactory, IconNodeFactory, PipePathFactory, LinePathFactory],
  nodes: [
    {
      id: "1",
      type: "action-node",
      menu: (
        <div>
          <TextField label="Width" type="number" />
          <TextField label="Height" type="number" />
        </div>
      ),
      width: 150,
      height: 50,
      x: 371,
      y: 173,
    },
    {
      id: "2",
      type: "action-node",
      menu: <div></div>,
      width: 150,
      height: 50,
      x: 20,
      y: 100,
    },
    {
      id: "3",
      type: "icon-node",
      extras: {
        label: "Run",
        icon: "NavigateNext",
        color: "purple",
      },
      width: 50,
      height: 50,
      x: 200,
      y: 20,
    },
    {
      id: "5",
      type: "icon-node",
      extras: {
        icon: "NavigateNext",
        color: "purple",
      },
      width: 50,
      height: 50,
      x: 300,
      y: 20,
    },
  ],
  paths: [
    {
      id: "2",
      type: 'line',
      points: [{ x: 420, y: 100 }, { x: 100, y: 100 }, {x: 100, y: 200}, {x: 200, y: 200}],
      source: "1",
      sourceHandle: "inlet",
    },
    {
      id: "3",
      type: 'pipe-path',
      points: [{ x: 420, y: 100 }, { x: 800, y: 100 }, {x: 800, y: 200}, {x: 900, y: 200}, {x: 900, y: 300}, {x: 1000, y: 300}, {x: 1000, y: 200}, {x: 1100, y: 200}, {x: 1100, y: 100}, {x: 1000, y: 100}, {x: 1000, y: 50}],
      source: "1",
      sourceHandle: "inlet",
    },

    {
      id: '4',
      type: 'pipe-path',
      points: [],
      source: "1",
      sourceHandle: 'outlet',
      target: '2',
      targetHandle: 'inlet'
    }
  ],
};

export const ChangesItems = SelfControlledTemplate.bind({});
ChangesItems.args = {
  zoom: 120,
  nodes: [
    {
      id: "1",
      type: "action-node",
      menu: (
        <div>
          <TextField label="Width" type="number" />
          <TextField label="Height" type="number" />
        </div>
      ),
      width: 150,
      height: 50,
      x: 500,
      y: 200,
    },
    {
      id: "2",
      type: "action-node",
      menu: (
        <div>
          <TextField label="Width" type="number" />
          <TextField label="Height" type="number" />
        </div>
      ),
      width: 150,
      height: 50,
      x: 500,
      y: 100,
    },
  ],
  paths: [
    {
      id: "3",
      type: 'pipe-path',
      points: [], //{ x: 420, y: 100 }, { x: 800, y: 100 }, {x: 800, y: 200}, {x: 900, y: 200}, {x: 900, y: 300}, {x: 1000, y: 300}, {x: 1000, y: 200}, {x: 1100, y: 200}, {x: 1100, y: 100}, {x: 1000, y: 100}, {x: 1000, y: 50}],
      source: "1",
      sourceHandle: "inlet",
      target: '2',
      targetHandle: 'outlet'
    },
  ],
  factories: [ActionNodeFactory, IconNodeFactory, PipePathFactory, LinePathFactory],

}