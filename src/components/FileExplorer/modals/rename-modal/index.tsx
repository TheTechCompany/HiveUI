import { Dialog, DialogActions, Button, TextField, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { useState } from 'react'
import { BaseModal } from '../../../../modals'
import { IFile } from '../../types/file';

export interface RenameModalProps {
    open: boolean;
    selected?: IFile;
    onClose?: () => void;
    onSubmit?: (name: string) => void;
}

export const RenameModal : React.FC<RenameModalProps> = (props) => {

    const [ name, setName ] = useState('');

    const submit = () => {
        props.onSubmit?.(name);
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
                <Button onClick={submit} variant="contained">Rename</Button>
            </DialogActions>
        </Dialog>
    )
}