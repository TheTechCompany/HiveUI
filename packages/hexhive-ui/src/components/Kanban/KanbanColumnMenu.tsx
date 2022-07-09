import { Menu, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material'
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';


export const KanbanColumnMenu : React.FC<any> = (props) => {
    const target = useRef<any>(null);
    const [ menuOpen, openMenu ] = useState<boolean>(false);

    return (
        <IconButton sx={{color: 'white'}}>
            <MoreVert color="inherit" />
        </IconButton>
 
    ) ; 
}

/*
       <Menu
            dropAlign={{top: 'bottom', left: 'left'}} 
            dropBackground="neutral-1" 
             icon={<MoreVert />} 
             items={props.menu}/>
*/