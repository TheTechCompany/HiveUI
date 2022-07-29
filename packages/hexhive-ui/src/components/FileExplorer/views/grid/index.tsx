import { Box, Grid } from '@mui/material';
import React from 'react';
import { useFileExplorer } from '../../context';
import { GridCard } from './GridCard';

export interface GridViewProps {

}

export const GridView : React.FC<GridViewProps> = (props) => {
    const { files, selectFile, selected } = useFileExplorer()

    return (
        <Box>
            <Grid container spacing={2}>
                {files?.map((file) => (<GridCard onClick={() => selectFile?.(file.id, !((selected || []).indexOf(file.id || '') > -1))} data={file} />))}
            </Grid>
        </Box>
    )
}