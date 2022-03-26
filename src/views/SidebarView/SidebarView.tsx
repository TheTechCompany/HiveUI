import { Box } from 'grommet';
import React from 'react';
import { RouteObject, Routes, useNavigate, useRoutes } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar } from '../../components';
import { useViewport } from '../../hooks';

export interface SidebarViewProps {
    menu?: any[];
    onMenuSelect?: (item: any) => void;
    routes?: RouteObject[]

    className?: string;
}

export const BaseSidebarView : React.FC<SidebarViewProps> = (props) => {

    const routing_table = props.menu?.map((menu_item) => ({
        path: menu_item.path,
        element: menu_item.component,
        children: []
    }))

    const routes = useRoutes(routing_table || [])

    console.log({routes})
    const navigate = useNavigate()

    const { width, height, resizeListener, isMobile, isTablet } = useViewport()

    const getDirection = () => {
        if(!isMobile){
          return 'row';
        }else{
          return 'column-reverse'
        }
      }

      console.log({isMobile})
    return (
        <Box 
            direction={isMobile ? 'column-reverse' : 'row'}
            flex 
            className={props.className}>
            {resizeListener}
            <Sidebar
                menu={props.menu || []}
                onSelect={(item) => {
                    console.log({item: item.path})
                    
                    
                    navigate(item.path)
                }}
                />
            <Box>
                    {routes}
            </Box>
        </Box>
    )
}

export const SidebarView = BaseSidebarView