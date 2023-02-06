import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { InfiniteCanvasContext } from '../context/context';

export interface GuideLayerProps {
    guides: any[];
}

export const GuideLayer : React.FC<GuideLayerProps> = (props) => {

    const { 
        zoom,
        offset
    } = useContext(InfiniteCanvasContext)

    return (
        <Box
            sx={{
                pointerEvents: 'none',
                transformOrigin: '0 0',
                transform: `matrix(${zoom}, 0, 0, ${zoom}, ${offset.x}, ${offset.y})`,
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: '100%',
                height: '100%',
            }}>
            {props.guides}
        </Box>
    )
}