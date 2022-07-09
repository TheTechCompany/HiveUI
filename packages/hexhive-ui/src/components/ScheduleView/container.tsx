import { Box, Paper } from '@mui/material';
import React from 'react';

export const ScheduleContainer : React.FC<any> = (props) => {
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
        
            <Box sx={{display: 'flex'}}>
                {props.header}
            </Box>
            <Box sx={{display: 'flex', flex: 1}}>
                {props.children}
            </Box>
        </Paper>
    );
}