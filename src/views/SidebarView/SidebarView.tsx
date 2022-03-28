import { Box } from 'grommet';
import React from 'react';
import { RouteObject, Routes, useNavigate, useRoutes } from 'react-router-dom';
import { Sidebar } from '../../components';
import { useViewport } from '../../hooks';

export interface SidebarViewProps {
    menu?: any[];

    viewportPadding?: string;
    className?: string;
}

export const SidebarView : React.FC<SidebarViewProps> = (props) => {

    const routing_table = props.menu?.map((menu_item) => ({
        path: menu_item.path,
        element: menu_item.component,
        children: []
    }))

    const routes = useRoutes(routing_table || [])

    const navigate = useNavigate()

    const { width, height, resizeListener, isMobile, isTablet } = useViewport()

    const Components = [
        <Sidebar
            menu={props.menu || []}
            onSelect={(item) => {                    
                navigate(item.path)
            }}
            />,
        <Box 
            pad={props.viewportPadding || 'xsmall'} 
            flex>
            {routes}
        </Box>
    ]
    return (
        <Box 
            direction={isMobile ? 'column' : 'row'}
            flex 
            className={props.className}>
            {resizeListener}

            {isMobile ? Components.reverse() : Components}
        </Box>
    )
}
