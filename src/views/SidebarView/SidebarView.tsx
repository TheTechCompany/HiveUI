import { Box } from 'grommet';
import React from 'react';
import { RouteObject, Routes, useRoutes } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar } from '../../components';

export interface SidebarViewProps {
    menu?: any[];
    onMenuSelect?: (item: any) => void;
    routes?: RouteObject[]

    className?: string;
}

export const BaseSidebarView : React.FC<SidebarViewProps> = (props) => {

    const routes = useRoutes(props.routes || [])

    return (
        <Box flex className={props.className}>
            <Sidebar
                menu={props.menu || []}
                onSelect={props.onMenuSelect}
                />
            <Box>
                <Routes>
                    {routes}
                </Routes>
            </Box>
        </Box>
    )
}

export const SidebarView = styled(BaseSidebarView)`
    flex-direction: row;

    @media only screen and (max-width: 600px) {
        flex-direction: column-reverse;
    }
`