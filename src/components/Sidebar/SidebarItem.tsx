import { Box, Text } from 'grommet';
import React from 'react';
import { useMatch, useResolvedPath } from 'react-router-dom';

export interface SidebarMenuItemProps {
    path: string
    icon: any;
    label?: string;
    minified?: boolean;
    onClick: () => void;
}

export const SidebarMenuItem : React.FC<SidebarMenuItemProps> = (props) => {

    const path = useResolvedPath(props.path);
    const isActive = useMatch(path.pathname);

    return (
        <Box 
            onClick={props.onClick}
            hoverIndicator={'gray'}
            direction='row'
            pad='small'
            align='center'
            justify={props.minified ? 'center' : undefined}
            background={isActive  ? 'gray' : 'transparent'}>

        {/* <li
            key={`sidebar-${ix}`}
            className={`sidebar-menu-opt ${matchPath(props.active, x.path)  ? "active" : ''}`}
            onClick={() => props.onSelect(x)}> */}
            <Box>
             {React.cloneElement(props.icon, {style: {maxHeight: '20px', maxWidth: '20px'}})}
            </Box>
            {!props.minified && <Text size="15px" color={'neutral-1'} margin={{left: 'small'}}>{props.label}</Text>}


          {/* </li> */}
        </Box>
    )
}