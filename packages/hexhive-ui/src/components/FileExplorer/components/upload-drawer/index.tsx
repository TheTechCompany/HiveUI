import { Box, Typography, Button, List, CircularProgress, ListItem, IconButton, Collapse, Paper } from '@mui/material';
import { KeyboardArrowDown as Down, KeyboardArrowUp as Up } from '@mui/icons-material'
import React, { useState } from 'react';
import { useFileExplorer } from '../../context';

export interface UploadDrawerProps {

}

export const UploadDrawer : React.FC<UploadDrawerProps> = (props) => {
    const [ expanded, setExpanded ] = useState<boolean>(true)

    const { uploading } = useFileExplorer()

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                right: 3,
                bottom: 3,
                maxHeight: '200px',
                minWidth: '150px'
            }}>
                <Box
                    sx={{
                        bgcolor: 'secondary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '3px'
                    }}>
                    <Typography>Uploads</Typography>
                    <IconButton 
                        onClick={() => setExpanded(!expanded)}
                        sx={{color: "white"}}
                        size="small" 
                        >

                        {expanded ? <Down  /> : <Up  />}
                    </IconButton>

                </Box>
                <Collapse 
                    in={expanded}>
                    <Box 
                        sx={{minHeight: '100px', flex: 1, overflow: 'auto', display: 'flex'}}>
                        <List  sx={{flex: 1}} >
                            {uploading?.map((datum) => (
                                <ListItem sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Typography>{datum.name}</Typography>
                                    <CircularProgress size="20px" variant="determinate" value={datum.percent}/>
                                </ListItem>
                            ))}
                            {/* {(datum: any) => (
                                <Box 
                                    pad="xsmall"
                                    align="center"
                                    justify="between"
                                    direction="row">
                                    <Text>{datum.name}</Text>
                                    <Box width="20px" height="20px">
                                    <Meter 
                                        
                                        size="xsmall"
                                        type="pie" 
                                        value={datum.percent} />
                                    </Box>
                                 
                                </Box>
                            )} */}
                        </List>
                         
                    </Box>
                </Collapse>
        </Paper>
    )
}