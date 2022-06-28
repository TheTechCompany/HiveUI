import { TextField } from '@mui/material';
import React from 'react'
import { BaseModal } from '../../../../modals'
import { IFile } from '../../types/file';

export interface MoveModalProps {
    open: boolean;
    onClose?: () => void;
    onSubmit?: (newPath: string) => void;
    selected?: IFile;
}

export const MoveModal : React.FC<MoveModalProps> = (props) => {
    return (
        <BaseModal
            open={props.open}
            onClose={props.onClose}
            >
            <TextField label="Move file" />
        </BaseModal>
    )
}