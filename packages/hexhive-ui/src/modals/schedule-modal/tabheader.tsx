import { Box, Button } from '@mui/material'
import React from 'react'

export interface TabHeaderProps {
    activeTab?: string;
    setActiveTab?: (item: string) => void;
}

export const TabHeader : React.FC<TabHeaderProps> = (props) => {
    const menu = [
        'People',
        'Equipment',
        'Notes'
    ]
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                padding: '3px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    bgcolor: 'secondary.light'
                }}
                gap="xsmall">
                {menu.map((item) => (
                    <Button
                        // active={props.activeTab === item.toLowerCase()}                        
                        onClick={() => props.setActiveTab?.(item.toLowerCase())}>
                        
                        {item}
                        
                    </Button>
                ))}

            </Box>

        </Box>
    )
}