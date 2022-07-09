import React from 'react'
import { TextField } from '@mui/material'

export const NoteTab = ({notes, updateNotes}: any) => {
    return (
        <>
            <TextField 
                multiline
                value={notes}
                onChange={updateNotes}
                minRows={8}
                placeholder="Notes" />
        </>
    );
}