import { Box, Grid } from '@mui/material';
import React from 'react';
import { useFileExplorer } from '../../context';
import { ThumbnailCard } from './ThumbnailCard';

export interface ThumbnailViewProps {
    
}

export const ThumbnailView : React.FC<ThumbnailViewProps> = (props) => {
    const { files } = useFileExplorer()
    
    return (
        <Box>
            <Grid
                container
                spacing={2}>
                {files?.map((file) => (<ThumbnailCard data={file} />))}
            </Grid>
        </Box>
    )
}