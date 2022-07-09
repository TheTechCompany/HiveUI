import { Box, Typography } from '@mui/material';
import React from 'react';
import { useMatch, useResolvedPath } from 'react-router-dom';
import { useViewport } from '../../hooks';

export interface SidebarMenuItemProps {
    path: string
    icon: any;
    label?: string;
    minified?: boolean;
    onClick: () => void;
}

export const SidebarMenuItem : React.FC<SidebarMenuItemProps> = (props) => {

    const { isMobile } = useViewport()

    const path = useResolvedPath(props.path);
    const isActive = useMatch(path.pathname);

    const iconSize = isMobile ? '50px' : '20px';
    return (
        <Box 
            onClick={props.onClick}
            sx={{
                display: 'flex',
                flexDirection:'row',
                padding: '3px',
                alignItems: 'center',
                justifyContent: props.minified ? 'center' : undefined,
                background: isActive  ? 'gray' : 'transparent'
            }}>

            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center' ,
                    justifyContent: 'center',
                    width: iconSize,
                    height: iconSize,
                    padding: isMobile ? '8px' : undefined
                }}>
                 {props.icon}
            </Box>
            {!props.minified && <Typography>{props.label}</Typography>}

        </Box>
    )
}