import { Dialog, DialogActions, Button, TextField, Typography, Box, DialogTitle, DialogContent, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

export interface FolderModalProps {
    open: boolean;
    onClose?: () => void;
    onSubmit?: (folder: string) => Promise<void>;
}

export const FolderModal : React.FC<FolderModalProps> = (props) => {

    const [ loading, setLoading ] = useState(false);

    const [ folder, setFolder ] = useState('');

    const submit = async () => {
        //TODO loading indicator
        setLoading(true)
        await props.onSubmit?.(folder);
        setLoading(false);
        setFolder('')
    }

    return (
        <Dialog 
            open={props.open}
            onClose={props.onClose}>
            <DialogTitle>
                <Typography>Create Folder</Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{width: '200px'}}>
                    <Box sx={{padding: '6px'}}>
                        <TextField value={folder} onChange={(e) => setFolder(e.target.value)} size="small" label="Folder name" />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
                <Button 
                    disabled={loading}
                    onClick={submit} 
                    variant="contained">{loading ? <CircularProgress color='info' size={20} /> : "Create"}</Button>
            </DialogActions>
        </Dialog>
    );
}