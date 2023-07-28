import React, { memo } from 'react';
import * as Icons from "@mui/icons-material"
import { Handle, NodeProps, Position } from "reactflow"
import { Paper } from '@mui/material';

export default memo(({data}: NodeProps) => {
    const Icon = (Icons as any)[data.icon]
    return (
        <Paper sx={{width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Handle 
                // style={{top: 0, left: 0}}
                position={Position.Left}
                type="target"
                />
            <Icon />
            <Handle
                // style={{bottom: 0, left: -10}}
                position={Position.Right}
                type="source"
                />
        </Paper>
    )
})