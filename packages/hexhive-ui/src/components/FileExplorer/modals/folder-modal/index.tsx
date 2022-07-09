import { Dialog, DialogActions, Button, TextField, Typography, Box } from '@mui/material';
import React, { useState } from 'react';

export interface FolderModalProps {
    open: boolean;
    onClose?: () => void;
    onSubmit?: (folder: string) => Promise<void>;
}

export const FolderModal : React.FC<FolderModalProps> = (props) => {

    const [ folder, setFolder ] = useState('');

    const submit = async () => {
        //TODO loading indicator
        await props.onSubmit?.(folder);
    }

    return (
        <Dialog 
            open={props.open}
            onClose={props.onClose}>
            <Box sx={{width: '200px'}}>
                <Box sx={{bgcolor: 'secondary.main', padding: '3px'}}>
                    <Typography>Create folder</Typography>
                </Box>
                <Box sx={{padding: '6px'}}>
                    <TextField value={folder} onChange={(e) => setFolder(e.target.value)} size="small" label="Folder name" />
                </Box>
            </Box>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
                <Button onClick={submit} variant="contained">Create</Button>
            </DialogActions>
        </Dialog>
    );
}