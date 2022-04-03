import { Box } from 'grommet';
import React from 'react';
import { RouteObject, Routes, useNavigate, useRoutes } from 'react-router-dom';
import { Sidebar } from '../../components';
import { useViewport } from '../../hooks';

export interface SidebarViewItem {
    path: string;
    component: any;
    icon?: any;
    label?: string;
}
export interface SidebarViewProps {
    views?: SidebarViewItem[];

    viewportPadding?: string;
    className?: string;
}

export const SidebarView : React.FC<SidebarViewProps> = (props) => {

    const routing_table = props.views?.map((menu_item) => ({
        path: `${menu_item.path}/*`,
        element: menu_item.component,
        children: []
    }))

    const routes = useRoutes(routing_table || [])

    const navigate = useNavigate()

    const { width, height, resizeListener, isMobile, isTablet } = useViewport()

    const Components = [
        <Sidebar
            menu={props.views || []}
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
