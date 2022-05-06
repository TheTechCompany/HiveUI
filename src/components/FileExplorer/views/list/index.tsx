import { Box, ListItemText, List, Checkbox, Button, Typography, IconButton, ListItem, ListItemButton } from '@mui/material';
import { Folder, MoreVert, More } from '@mui/icons-material';
import React from 'react';
import { useFileExplorer } from '../../context';
import { IFile } from '../../types/file';
import { humanFileSize } from '../../utils';

export interface ListViewProps {
}
 // onClickItem={({item}: any) => selectFile?.(item)}
export const ListView : React.FC<ListViewProps> = (props) => {
    const { files, navigate, selectFile, clickFile, selected } = useFileExplorer()

    return (
        <Box>
            <List>
                {files?.map((datum: IFile) => (
                    <ListItemButton
                        dense
                        onClick={() => {

                        }}
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                      >
                          <Box style={{display: 'flex', alignItems: 'center', padding: 4, marginRight: 5}}>
                          {datum.isFolder ? <Folder /> :  undefined}

                          </Box>
                            {/* <Checkbox checked={(selected || '').indexOf(datum.id || '') > -1} onChange={(e) => {
                                e.stopPropagation()
                                selectFile?.(datum.id || '', e.target.checked)
                            }}/> */}
                        <Box 
                            style={{display: 'flex', alignItems: 'center', flex: 1}}
                            onClick={(e) => {
                                datum.isFolder ? navigate?.(datum.name || '') : clickFile?.(datum)
                            }} >
                            <Box style={{display: 'flex', alignItems: 'center', flex: 1}} >
            
                               
                                <Typography>{datum.name}</Typography>

                            </Box>

                            <Box style={{display: 'flex', alignItems: 'center'}}>
                                <Typography>{humanFileSize(datum.size || 0)}</Typography>
                                <IconButton>
                                    <MoreVert />
                                </IconButton>
                            </Box>
                        </Box>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )
}