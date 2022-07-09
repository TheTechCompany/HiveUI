import React from 'react';
import { invertColor, stringToColor } from '@hexhive/utils';
import { Box, Typography } from '@mui/material';
import { ScheduleItem } from '../types';

interface HeaderProps {
    data: ScheduleItem
    moveUp: () => void;
    moveDown: () => void;
}

export const Header : React.FC<HeaderProps> = ({data, moveUp, moveDown}) => {
    let color = stringToColor(`${data.project.id} - ${data.project.name}`) // stringToColor(`${data.owner?.id}` || '');
    let arrowColor = '' //invertColor(color); 

    return (
        <Box
           style={{
              height: '24px', 
              background: color,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'cen ter',
              paddingLeft: '8px'
           }}>
          <Typography fontSize="small" style={{color: 'white'}}>{data.project.displayId}</Typography>
          {/* <Box direction="row">
           <Button plain icon={<ArrowUp size="small" />} onClick={moveUp} />
           <Button plain icon={<ArrowDown size="small" />} onClick={moveDown} />
            
          </Box> */}
        </Box>
    );
}