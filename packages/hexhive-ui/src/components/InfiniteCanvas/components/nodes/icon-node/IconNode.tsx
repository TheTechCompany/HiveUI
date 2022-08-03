import { Box, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components'
import * as Icons from '@mui/icons-material'
import { ChevronLeft } from '@mui/icons-material'
import { PortWidget } from '../../ports';

export interface IconNodeProps{
    className?: string;
    extras?: {
        label?: string;
        color?: string;
        icon?: any;
    },
    isSelected?: boolean;

    width?: any;
    height?: any
    children?: (element: JSX.Element) => JSX.Element
}

const _Icons : any = Icons;

export const BaseIconNode : React.FC<IconNodeProps> = (props) => {
    const Icon = (props.extras?.icon ? (typeof(props.extras.icon) == 'string' ? (Icons as any)[props.extras.icon] : props.extras?.icon) : () => <>missing icon</>) || (() => <>missing icon</>);

    console.log({Icon, icon: props.extras?.icon, type: typeof(props.extras?.icon)})

    return (
        <Box 
            sx={{
                width: props.width || '72px',
                height: props.height || '72px',
                border:  props.isSelected ? '1px solid black' : '1px dashed black'
            }}
            className={props.className}>
            {props.children?.(<Icon size="medium" />)}
        </Box>
    )
}


export const UnstyledIconNode = (props : IconNodeProps) => {

    return (
        <BaseIconNode
            width={{min: props.extras?.label ? '72px' : '55px'}}
            height={props.extras?.label ? '72px' : '55px'}
            {...props}>
            {(icon) => (
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: props.extras?.label ? 'center' : 'center',
                        alignItems: props.extras?.label ? 'center': 'center',
                        flexDirection: 'column'
                    }}>
                    <PortWidget direction="center" type="in" id="in" />
                    {icon}
                    {props.extras?.label && (
                    
                        <Typography >{props.extras?.label}</Typography>
                   
                    )}
                    <PortWidget direction="center" type="out" id="out"    />
                </Box>
            )}
    
        </BaseIconNode>
    )
}


export const IconNode = styled(UnstyledIconNode)`
    .port{
        border-radius: 7px;
        height: 12px;
        width: 12px;
    }

    .port-base:first-child{
        top: -6px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        position: absolute;
    }

    .port-base:last-child{
        bottom: -6px;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        position: absolute;
    }
`