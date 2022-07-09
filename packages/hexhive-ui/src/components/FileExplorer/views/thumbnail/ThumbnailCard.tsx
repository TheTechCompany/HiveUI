import { Box, Button, Paper, Grid, IconButton, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import React from 'react';
import { useFileExplorer } from '../../context';
import { IFile } from '../../types/file';
import { humanFileSize } from '../../utils';

export interface ThumbnailCardProps {
    data?: IFile;
}

export const ThumbnailCard : React.FC<ThumbnailCardProps> = (props) => {
    const { selectFile, selected } = useFileExplorer()

    return (
        <Grid item xs={4}>
            <Paper
            style={{cursor: 'pointer', display: 'flex', flexDirection: 'column'}}
            onClick={() => selectFile?.(props.data?.id, !((selected || []).indexOf(props.data?.id || '') > -1))}>
                <Box sx={{flexDirection: 'row', display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton size="small">
                        <MoreVert />    
                    </IconButton>
                </Box>
                <Box 
                    sx={{flex: 1, display: 'flex', flexDirection: 'row', padding: '6px'}}
                >
                    <Box sx={{flex: 1, bgcolor: '#dfdfdf'}}>
                        Preview
                    </Box>
                    <Box
                        sx={{
                            padding: '6px',
                            alignItems: 'center',
                            flexDirection: 'column',
                            display: 'flex'
                        }}>
                        <Typography>{props.data?.name}</Typography>
                        <Typography>{humanFileSize(props.data?.size || 0)}</Typography>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}