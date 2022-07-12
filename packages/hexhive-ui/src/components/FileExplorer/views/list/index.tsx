import { Box, ListItemText, List, Checkbox, Button, Typography, IconButton, ListItem, ListItemButton, Menu, MenuItem, Divider, Table, TableCell, TableRow, TableHead, TableBody, TableSortLabel } from '@mui/material';
import { Folder, MoreVert, More } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import { useFileExplorer } from '../../context';
import { IFile } from '../../types/file';
import { humanFileSize } from '../../utils';
import _ from 'lodash';
import moment from 'moment';


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
        triggerDeleteFile 
    } = useFileExplorer()

    const [anchorPos, setAnchorPos] = useState<{ top: number, left: number }>()

    const [anchorEl, setAnchorEl] = useState<any>(null)
    const [ selectedFile, setSelectedFile ] = useState<IFile | null>(null);

    const [ orderBy, setOrderBy ] = useState<string>();
    const [ order, setOrder ] = useState<'asc' | 'desc'>();

    const header = [
        {
            id: 'name',
            label: 'Name',
        },
        {
            id: 'lastUpdated',
            label: 'Last Modified',
        },
        {
            id: 'size',
            label: 'Size',
        }
    ]

    const createSortHandler = (property: string) => (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
        setOrderBy(property)
        setOrder(order === 'asc' ? 'desc' : 'asc')
    }

    const orderSort = (a: any, b: any) => {
        if(orderBy){
            if(order === 'asc'){
                return a[orderBy] > b[orderBy] ? 1 : -1
            }
            return a[orderBy] < b[orderBy] ? 1 : -1
        }
        return 0;
    }

    const clickTimer = useRef<any>();

    const onClickHandler = (event: any, file: any) => {
        clearTimeout(clickTimer.current)

        if(event.detail === 1){
            clickTimer.current = setTimeout(() => {
                selectFile?.(file.id)
            }, 200)
        }else if(event.detail === 2){
            if(file.isFolder && file.name){
                navigate?.(file.name)
            }else{
                clickFile?.(file)
            }
        }

    }
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
                {actions?.map((action) => [
                    
                    action.seperator == 'top' && <Divider />,
                    (<MenuItem 
                        sx={action.sx}    
                        onClick={() => {
                            if(selectedFile) action?.onClick?.(selectedFile)
                            setAnchorEl(null)
                        }}>
                            {action.icon}
                            {action.label}
                    </MenuItem>),
                    action.seperator == 'bottom' && <Divider />
                    ]).filter((a) => a != undefined)}
                <MenuItem                 
                    onClick={() => {
                    if(selectedFile) triggerRenameFile?.(selectedFile)
                    setAnchorEl(null)
                }}>Rename</MenuItem>
                <Divider />
                <MenuItem                 
                    onClick={() => {
                    if(selectedFile) triggerDeleteFile?.(selectedFile)
                    setAnchorEl(null)
                }} sx={{color:"red"}}>Delete</MenuItem>
            </Menu>
            <Table size="small">
                <TableHead sx={{bgcolor: 'secondary.main'}}>
                    <TableRow>
                        <TableCell width={'25px'} />
                        {header.map((header_item) => (
                            <TableCell
                                sx={{color: 'white'}}
                                sortDirection={orderBy === header_item.id ? order : false}
                                >
                                <TableSortLabel
                                    sx={{color: 'white', '& .MuiTableSortLabel-root': {color: 'white'}, '& .MuiTableSortLabel-icon': {color: 'white'}}}
                                     active={orderBy === header_item.id}
                                     direction={orderBy === header_item.id ? order : 'asc'}
                                     onClick={createSortHandler(header_item.id)}
                                    >
                                    
                                    {orderBy === header_item.id ? (
                                        <Box component="span" sx={{display: 'none'}}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null} 
                                    {header_item.label}

                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files?.sort(orderSort).map((file) => {

                        return (
                            <TableRow 
                                hover
                                onClick={(e) => {
                                    onClickHandler(e, file)
                                }}
                                sx={{cursor: 'pointer', bgcolor: (selected || []).indexOf(file.id || '') > -1 ? '#556bdd42': undefined, '&.MuiTableRow-hover:hover': {background: (selected || []).indexOf(file.id || '') > -1 ? '#556bdd69': undefined}}}
                                key={file.id}>
                                <TableCell sx={{alignItems: 'center'}} width={'25px'}>
                                    {file.icon}
                                </TableCell>
                                <TableCell>
                                    <Typography>{file.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    {moment(file.lastUpdated).format('hh:mma - DD/MM/YY')}
                                </TableCell>
                                <TableCell>
                                    {humanFileSize(file.size || 0)}
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation()
                                        setAnchorEl(e.currentTarget)
                                    }}>
                                        <MoreVert />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Box>
    )
}
