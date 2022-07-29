import { Box, Button } from '@mui/material';
import React from 'react';

export interface KanbanCreateColumnProps {
    onCreate?: () => void;
}

export const KanbanCreateColumn : React.FC<KanbanCreateColumnProps> = (props) => {
    return (
        <Box style={{display: 'flex', width: '300px', background: '#dfdfdf'}}>
            <Button 
                sx={{textTransform: 'none'}} 
                fullWidth>Create Column...</Button>
        </Box>
    )
}