import { Box, ListItemText, List, Checkbox, Button, Typography, IconButton, ListItem, ListItemButton, Menu, MenuItem, Divider } from '@mui/material';
import { Folder, MoreVert, More } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import { useFileExplorer } from '../../context';
import { IFile } from '../../types/file';
import { humanFileSize } from '../../utils';
import _ from 'lodash';

export interface ListViewProps {
}
 // onClickItem={({item}: any) => selectFile?.(item)}
export const ListView : React.FC<ListViewProps> = (props) => {
    const { 
        files, 
        navigate, 
        selectFile, 
        clickFile, 
        selected,
        actions,
        triggerRenameFile,
        triggerMoveFile,
        triggerDeleteFile 
    } = useFileExplorer()

    const [anchorPos, setAnchorPos] = useState<{ top: number, left: number }>()

    const [anchorEl, setAnchorEl] = useState<any>(null)
    const [ selectedFile, setSelectedFile ] = useState<IFile | null>(null);

    return (
        <Box>
            <Menu
                anchorReference={'anchorEl'}
                anchorEl={anchorEl}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                open={Boolean(anchorEl)}
                // anchorPosition={anchorPos}
                onClose={() => setAnchorEl(null)}
                >
                {actions?.map((action) => (
                    <>
                    {action.seperator == 'top' && <Divider />}
                    <MenuItem 
                        sx={action.sx}    
                        onClick={() => {
                            if(selectedFile) action?.onClick?.(selectedFile)
                            setAnchorEl(null)
                        }}>
                            {action.icon}
                            {action.label}
                    </MenuItem>
                    {action.seperator == 'bottom' && <Divider />}
                    </>
                ))}
                <MenuItem onClick={() => {
                    if(selectedFile) triggerRenameFile?.(selectedFile)
                    setAnchorEl(null)
                }}>Rename</MenuItem>
                <MenuItem onClick={() => {
                    if(selectedFile) triggerMoveFile?.(selectedFile)
                    setAnchorEl(null)
                }}>Move</MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    if(selectedFile) triggerDeleteFile?.(selectedFile)
                    setAnchorEl(null)
                }} sx={{color:"red"}}>Delete</MenuItem>
            </Menu>
            <List>
                {files?.map((datum: IFile) => (
                    <ListItem
                        dense
                        secondaryAction={(actions || []).length > 0 && (
                            <IconButton sx={{zIndex: 9}} onClick={(e) => {
                                setAnchorEl(e.target)
                                setSelectedFile(datum)
                            }}>
                                <MoreVert />
                            </IconButton>
                        )}
                        >
                    <ListItemButton
                        onClick={() => {

                        }}
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative'}}
                      >
                          <Box style={{display: 'flex', alignItems: 'center', padding: '4px', marginRight: '5px'}}>
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
                               
                            </Box>
                        </Box>
                    </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}