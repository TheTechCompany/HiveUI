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
        <Box sx={{minHeight: '45px', marginTop: '4px', marginBottom: '4px', display: 'flex', alignItems: 'center'}}>
            <Box sx={{display: 'flex', flex: 1}}>
                <FormControl
                    fullWidth
                    size="small"
                    onChange={(option) => props.updateCapacityItem('type', option)}
                    value={props.item.type}
                    placeholder="Type"
                    valueKey='id'
                    labelKey='label'
                    options={["Welder", "Fabricator", "Skilled Labourer", "Civil Subcontractor", "TA"].map((x) => ({id: x, label: x}))} />
            </Box>
            <Box sx={{display: 'flex', flex: 1}}>
                <FormControl 
                    fullWidth
                    size="small"
                    value={props.item.location}
                    onChange={(option) => props.updateCapacityItem('location', option)}
                    placeholder="Location"
                    valueKey='id'
                    labelKey='label'
                    options={["Site", "Workshop"].map((x) => ({id: x, label: x}))} />
            </Box>
            <Box sx={{display: 'flex', flex: 1}}>
                <TextField  
                    type="number"
                    size="small"
                    value={props.item.estimate}
                    onChange={(e) => props.updateCapacityItem('estimate', parseFloat(e.target.value))}
                    label={props.type == "Projects" ? "Estimated hours" : "People"} />
            </Box>
            <IconButton onClick={() => props.removeCapacityItem()} >
                <Close />
            </IconButton>
        </Box>
    );
}