import { Box, Paper, Typography, Grid } from '@mui/material';
import React from 'react';
import { IFile } from '../../types/file';

export interface GridCardProps {
    data?: IFile;
    onClick?: () => void;
}
export const GridCard : React.FC<GridCardProps> = (props) => {
    return (
        <Grid item xs={4}>
            <Paper
                
                style={{cursor: 'pointer', display: 'flex', flexDirection: 'column'}}
                onClick={props.onClick}
            >
                <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {props.data?.icon}  
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography>{props.data?.name}</Typography>
                </Box>
            </Paper>
        </Grid>
    )   
}