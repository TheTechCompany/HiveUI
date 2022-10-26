import { Box } from '@mui/material';
import React from 'react';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import { ExitToApp } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

export interface ScheduleModalHeaderProps {
    projects?: {displayId: string, name: string}[]
    activeTab?: string;
    setActiveTab?: (tab: string) => void;

    item?: any;
    onChange?: (item: any) => void;
}

export const ScheduleModalHeader : React.FC<ScheduleModalHeaderProps> = (props) => {
    // const navigate = useNavigate();

    return (
 

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <Box sx={{flex: 1}}>
                    <Autocomplete
                        size='small'
                        value={props.item?.project}
                        
                        disablePortal
                        onChange={(event, value) => {
                            props.onChange?.({
                                ...props.item,
                                project: value
                            })
                        }}
                        getOptionLabel={(option: any) => `${option.displayId} - ${option.name}`}
                        renderOption={(props, option) => (<li {...props}>{option.displayId} - {option.name}</li>)}
                        options={props.projects || []}
                        renderInput={(params) => <TextField  {...params} color='primary' size='small' label="Project" />} />
                </Box>
                <IconButton 
                    href={`/projects/${props.item?.project?.displayId}`}>
                    <ExitToApp />
                </IconButton>
            </Box>
          


    )
}