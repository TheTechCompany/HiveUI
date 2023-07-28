import { Box } from "@mui/material";
import React, { useCallback, useEffect } from "react"
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
} from "reactflow"
import 'reactflow/dist/style.css';
import { LineEdge } from "./edges/line";
import { HMINode, IconNode } from "./nodes";

export interface FlowCanvasProps {
    nodes?: any[];
    paths?: any[];
}

const edgeTypes = {
    line: LineEdge
}

const nodeTypes = {
    icon: IconNode,
    hmi: HMINode
}

export const FlowCanvas : React.FC<FlowCanvasProps> = (props) => {

    const [ nodes, setNodes, onNodesChange ] = useNodesState(props.nodes || [])
    const [ edges, setEdges, onEdgesChange ] = useEdgesState(props.paths || [])


    useEffect(() => {
        console.log({nodes})
    }, [nodes])
    

    useEffect(() => {
        console.log({edges})
    }, [edges])

    const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'line', data: {points: []} }, eds)), [setEdges]);


    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            bgcolor: 'secondary.main'
        }}>
            <ReactFlow 
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </Box>
    )
}