import { Box, Button } from 'grommet';
import React from 'react';

export interface BreadcrumbProps {
    breadcrumbs: {name: string, id?: string}[]
    onBreadcrumbClick: (crumb: string) => void
}

export const Breadcrumbs : React.FC<BreadcrumbProps> = (props) => {
    return (
        <Box direction="row">
            {props.breadcrumbs.length < 1 && '/'}
            {props.breadcrumbs.map((crumb, ix) => (
                <Box direction="row">
                {ix == 0 && '/'}
                <Button
                    onClick={() => props.onBreadcrumbClick(props.breadcrumbs.slice(0, ix + 1).map((x) => x.name).join('/'))}
                    style={{ borderRadius: 3, padding: '2px'}} hoverIndicator plain label={crumb.name} /> 
                {props.breadcrumbs.length - 1 > ix && '/'}
                </Box>
            ))}
        </Box>
    )
}