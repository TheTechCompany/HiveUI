import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { InfiniteCanvasContext } from '../../context/context';

import { Box, Typography } from '@mui/material'
import styled from 'styled-components'
import { BasePort, usePort } from './base';

export interface PortWidgetProps {
    id?: string;
    type?: string;
    round?: boolean;
    className?: string;
    label?: string;
    direction?: "left" | "right" | "center";
}


const Port = styled.div`
    width: 10px;
    height: 10px;
    background: ${p => (p.style as any)?.portDotColor || (p.style as any)?.portColor || 'green'};

    &:hover{
        background: ${p => (p.style as any)?.portDotColor || (p.style as any)?.portColor || 'green'};
        opacity: 0.8;
    }
`

export const UnstyledPortWidget : React.FC<PortWidgetProps> = (props) => {

    const { extraProps, dragPort } = usePort({id: props.id})
    
    const { style } = useContext(InfiniteCanvasContext)


    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log("DRAG", props.id)
        //let bounds = ref.current?.getBoundingClientRect();
        dragPort?.(e)
    }

    return (
        <Box 
            style={{display: 'flex', alignItems: 'center', justifyContent: props.direction == "right" ? 'flex-start': (props.direction == 'center') ? 'center': 'flex-end' }}
            className={`port-base`}>
            {props.label && (props.direction == "left" || !props.direction ) && <Typography>{props.label}</Typography>}
            <Port
                onMouseDown={onMouseDown}
                {...extraProps}
                className={`port ${props.className} ${props.type || 'in'}`}>
            </Port>
            {props.label && (props.direction == "right") && <Typography>{props.label}</Typography>}

        </Box>
    )
}

export const PortWidget = styled(UnstyledPortWidget)`
    &:hover{
        background: rgba(255, 255, 255, 0.2);
    }
`