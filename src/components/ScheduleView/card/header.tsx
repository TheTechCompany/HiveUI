import React from 'react';
import { invertColor, stringToColor } from '@hexhive/utils';
import { Box, Text, Button } from 'grommet';
import { Down as ArrowDown, Up as ArrowUp } from 'grommet-icons'
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
            justify="center"
           direction="row"
           background={color}
           style={{
              height: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              paddingLeft: '8px'
           }}>
          <Text size="small" style={{color: 'white'}}>{data.project.displayId}</Text>
          {/* <Box direction="row">
           <Button plain icon={<ArrowUp size="small" />} onClick={moveUp} />
           <Button plain icon={<ArrowDown size="small" />} onClick={moveDown} />
            
          </Box> */}
        </Box>
    );
}