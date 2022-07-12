import { Dialog, DialogActions, Button, DialogContent, TextField, Typography, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { BaseModal } from '../../../../modals'
import { IFile } from '../../types/file';

export interface DeleteModalProps {
    open: boolean;
    onClose?: () => void;
    onSubmit?: () => Promise<void>;
    selected?: IFile | IFile[];
}

export const DeleteModal : React.FC<DeleteModalProps> = (props) => {

    const [ loading, setLoading ] = useState(false);

    const submit = async () => {
        setLoading(true);
        await props.onSubmit?.();
        setLoading(false);
    }

    const renderItems = () => {
        if(!Array.isArray(props.selected)){
            return <Typography>- {props.selected?.name}</Typography>
                 
        }else{
            return props.selected.map((file) => (
                <Typography>- {file.name}</Typography>
            ))
        }
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            >
            <DialogContent>
                <Typography color="error">Warning</Typography>
                <Typography>This action is irreversible the selected items will be unrecoverable once completed</Typography>

                {renderItems()}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
                <Button 
                    disabled={loading}
                    onClick={submit} 
                    variant="contained" 
                    color="error">

                        {loading ? <CircularProgress size={20} /> : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}