import { Box, Button, IconButton, Select, TextField } from '@mui/material';
import React from 'react';
import { Close } from '@mui/icons-material'
import { FormControl } from '../../components';

export interface CapacityItemProps {
    type: "Projects" | "People" | "Estimates";

    item: any | {type: string, location: string, estimate: any} ;
    updateCapacityItem: (key: string, value: any) => void;
    removeCapacityItem: () => void;
}  

export const CapacityItem : React.FC<CapacityItemProps> = (props) => {
    return (
        <Box sx={{minHeight: '45px', display: 'flex', alignItems: 'center'}}>
        <Box sx={{display: 'flex'}}>
             <FormControl
                onChange={({option}) => props.updateCapacityItem('type', option)}
                value={props.item.type}
                placeholder="Type"
                options={["Welder", "Fabricator", "Skilled Labourer", "Civil Subcontractor", "TA"]} />
        </Box>
        <Box sx={{display: 'flex'}}>
            <FormControl 
                value={props.item.location}
                onChange={({option}) => props.updateCapacityItem('location', option)}
                placeholder="Location"
                options={["Site", "Workshop"]} />
        </Box>
        <Box sx={{display: 'flex'}}>
            <TextField  
                type="number"
                value={props.item.estimate}
                onChange={(e) => props.updateCapacityItem('estimate', parseFloat(e.target.value))}
                placeholder={props.type == "Projects" ? "Estimated hours" : "People"} />
        </Box>
        <IconButton onClick={() => props.removeCapacityItem()} >
            <Close />
        </IconButton>
    </Box>
    );
}