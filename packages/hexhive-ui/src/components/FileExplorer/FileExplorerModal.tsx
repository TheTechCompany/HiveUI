import React, { useState } from 'react';
import { BaseModal } from '../../modals/base-modal'
import { Breadcrumbs } from './components/breadcrumbs';
import { FileExplorerContext } from './context';
import { DEFAULT_ICONS } from './defaults/defaultIcons';
import { IFile } from './types/file';
import { ListView } from './views/list';
import { FileExplorer } from './FileExplorer';
import { Dialog, Box, Button, DialogTitle, ThemeProvider } from '@mui/material';
// import {}

export interface FileExplorerModalProps {
    open: boolean;
    onClose?: () => void;
    files?: IFile[];

    onSubmit?: (path: string) => void;

    title?: string;

    path?: string;
    onPathChange?: (path: string) => void;

    selected?: string[]
    onClick?: (file: IFile) => void;
    onSelect?: (selected: string[]) => void;
    // onDeselect?: (id: string) => void;
    onBack?: () => void;
}
export const FileExplorerModal : React.FC<FileExplorerModalProps> = ( props ) => {
  
    const formatFile = (file: IFile) => {
        return {
            ...file,
            icon: DEFAULT_ICONS(file)
        }
    }

    const [ selected, setSelected ] = useState<any[]>([])
    
    const selectFolder = () => {
        props.onSubmit?.(props.path || '/')
    }

    return (
        // <ThemeProvider theme={HexHiveTheme}>
        // <FileExplorerContext.Provider value={{
        //     files: props.files?.map(formatFile) || [],
        //     selected: props.selected,
        //     clickFile: props.onClick,
        //     // selectFile: (id, checked) => id && ((checked) ? props.onSelect?.(id) : props.onDeselect?.(id)),
            
        //     // actions: props.actions || [{key: 'download', icon: <DownloadOption />, disabled: (state) => (state.files?.length || 0) < 2}, {key: 'upload', icon: <UploadOption />}, {key: 'convert', icon: <Update />}, {key: 'organise', icon: <FormFolder />}]
        // }}>
        <Dialog 
            fullWidth
            open={props.open}
            onClose={props.onClose}>
            
            <DialogTitle>{props.title || "File Explorer"}</DialogTitle>
{/*           
            title="File Explorer"
            open={props.open}
            onSubmit={props.onSubmit}
            onClose={props.onClose}> */}
           <Box sx={{height: '50vh', display: 'flex'}}>
                <FileExplorer   
                    files={props.files}
                    path={props.path || '/'}
                    onNavigate={(path) => {
                        props.onPathChange?.(path)
                    }}
                    onSelect={(id) => {
                        let _selected = [...new Set([...selected, id])]
                        setSelected(_selected)
                        props.onSelect?.(_selected)
                    }}
                    onDeselect={(id) => {
                        let _selected = selected.slice();
                        let ix = _selected.indexOf(id);
                        if(ix > -1){
                            _selected.splice(ix, 1)
                        }
                        setSelected(_selected)
                        props.onSelect?.(_selected)
                    }}
                    selected={props.selected}
                        />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '6px'}}>
                <Button onClick={props.onClose}>Close</Button>
                <Button onClick={selectFolder} variant="contained">Select</Button>
            </Box>
        </Dialog> 
        // </FileExplorerContext.Provider>
        // </ThemeProvider>
    )
}