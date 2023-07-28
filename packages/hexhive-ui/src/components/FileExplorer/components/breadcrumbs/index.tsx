import { Box, Button, IconButton } from '@mui/material';
import { Home } from '@mui/icons-material';
import React from 'react';

export interface BreadcrumbProps {
    breadcrumbs: {name: string, id?: string}[]
    onBreadcrumbClick: (crumb: string) => void
}

export const Breadcrumbs : React.FC<BreadcrumbProps> = (props) => {
    return (
        <Box style={{display: 'flex', flex: 1, alignItems: 'center'}}>
            <IconButton 
                onClick={() => props.onBreadcrumbClick('')}
              >

                <Home />
            </IconButton>
            
            <Box style={{flex: 1, display: 'flex', borderRadius: 3}}>
            {props.breadcrumbs.length < 1 && '/'}
            {props.breadcrumbs.map((crumb, ix) => (
                <Box style={{display: 'flex',alignItems: 'center'}}>
                    <Box>{ix == 0 && '/'}</Box>
                    <Button
                        style={{color: 'black', textTransform: 'none'}}
                        onClick={() => props.onBreadcrumbClick(props.breadcrumbs.slice(0, ix + 1).map((x) => x.name).join('/'))}
                    >
                        {crumb.name}
                    </Button>
                    {props.breadcrumbs.length - 1 > ix && '/'}
                </Box>
            ))}
            </Box>
        </Box>
    )
}