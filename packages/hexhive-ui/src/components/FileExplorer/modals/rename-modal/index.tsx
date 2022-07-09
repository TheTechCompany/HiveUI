import { Dialog, DialogActions, Button, TextField, DialogContent, DialogTitle, Typography, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { BaseModal } from '../../../../modals'
import { IFile } from '../../types/file';

export interface RenameModalProps {
    open: boolean;
    selected?: IFile;
    onClose?: () => void;
    onSubmit?: (name: string) => Promise<void>;
}

export const RenameModal : React.FC<RenameModalProps> = (props) => {

    const [ loading, setLoading ] = useState(false);
    const [ name, setName ] = useState('');

    const submit = async () => {
        //TODO loading indicator
       await props.onSubmit?.(name);
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            >
            <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{marginBottom: '6px'}}>Rename</Typography>
                <TextField sx={{marginBottom: '6px'}} fullWidth size="small" disabled label="Current name" value={props.selected?.name} />
                <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{marginBottom: '6px'}} fullWidth size="small" label="New name" />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
                <Button
                    disabled={loading}
                    onClick={submit} 
                    variant="contained">{loading ? <CircularProgress size={20} /> : "Rename"}</Button>
            </DialogActions>
        </Dialog>
    )
}