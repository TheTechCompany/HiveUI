import { Box } from '@mui/material';
import React from 'react';
import styled from 'styled-components'
import { Block } from '../../InfiniteCanvas';

export interface TrayItemProps {
    model: Block;
    className?: string;
}

const BaseTrayItem : React.FC<TrayItemProps> = (props) => {
    return (
        <Box
            draggable
            className={`tray-item ${props.className}`}
            onDragStart={(event) => {
                event.dataTransfer.setData('infinite-canvas', JSON.stringify({type: props.model.blockType, extras: props.model.extras}))
                event.stopPropagation()
            }}>
            {props.children}
        </Box>
    )
}

export const TrayItem = styled(BaseTrayItem)`

`