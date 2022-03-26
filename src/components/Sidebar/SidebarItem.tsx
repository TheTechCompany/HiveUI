import { Box, Text } from 'grommet';
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
            hoverIndicator={'gray'}
            direction='row'
            pad='small'
            align='center'
            justify={props.minified ? 'center' : undefined}
            background={isActive  ? 'gray' : 'transparent'}>

            <Box align='center' justify='center' width={iconSize} height={iconSize}>
                 {props.icon}
            </Box>
            {!props.minified && <Text size="15px" color={'neutral-1'} margin={{left: 'small'}}>{props.label}</Text>}

        </Box>
    )
}