import { Dialog, DialogActions, Button, DialogContent, TextField, Typography } from '@mui/material';
import React from 'react'
import { BaseModal } from '../../../../modals'
import { IFile } from '../../types/file';

export interface DeleteModalProps {
    open: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
    selected?: IFile;
}

export const DeleteModal : React.FC<DeleteModalProps> = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            >
            <DialogContent>
                <Typography color="error">Warning</Typography>
                <Typography>This action is irreversible the selected items will be unrecoverable once completed</Typography>

                <Typography>- {props.selected?.name}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
                <Button onClick={props.onSubmit} variant="contained" color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}