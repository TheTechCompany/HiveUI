import { 
    Typography, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogActions, 
    DialogContent 
} from '@mui/material'
import React from 'react';

export interface BaseModalProps {
    open: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
    onDelete?: () => void;
    title?: string | JSX.Element;
    width?: string;
    height?: any;
}

export const BaseModal : React.FC<BaseModalProps> = (props) => {
    
    const onClose = () => {
        props.onClose?.()
    }

    return  (
        <Dialog 
            open={props.open}
            onClose={props.onClose}>
                {typeof(props.title) == "string" ? (
            <DialogTitle>

                    <Typography>{props.title}</Typography>
            </DialogTitle>

                ) : props.title}
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                {props.onDelete && <Button color='secondary' onClick={props.onDelete}>Delete</Button>}
                <Button onClick={props.onClose} >Cancel</Button>
                <Button onClick={props.onSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    )
}