import { Box, Typography} from '@mui/material';
import React from 'react'
import { ScheduleItem } from '../types';

interface FooterProps {
    data?: ScheduleItem;
}

export const Footer : React.FC<FooterProps> = ({data}) => {
    return (data?.notes || []).length > 0 ?  (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#F2726B"

            }}>
            
            <Typography color="white" className="notes-indicator">Notes: {data?.notes?.length}</Typography>
        </Box>
    ) : null;
}