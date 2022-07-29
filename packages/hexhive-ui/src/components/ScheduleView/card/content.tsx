import { Box, Typography } from '@mui/material';
import React from 'react';
import { ScheduleItem } from '../types';
import { FileHex } from '../../../assets';
import { AvatarList } from '../../AvatarList';
import { stringToColor } from '@hexhive/utils';
import { useContext } from 'react';
import { ScheduleViewContext } from '../context';

interface ContentProps {
   data: ScheduleItem;

   users: any[];
}

export const Content: React.FC<ContentProps> = ({ data, users }) => {


   const staffNames = () => {
      const names = data?.people || []

      if (names?.length > 0) {
         return (
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
               className="staff-container">
               {names.map((item: any) => item && (
                  <Typography fontSize='small'>{item?.name}</Typography>
               ))}
            </Box>);
      } else {
         return null;
      }
   }


   const plantItems = () => {
      const items = (data?.equipment || [])

      if (items.length > 0) {
         return (
            <Box sx={{display: 'flex', flexDirection: 'column'}}  className="plant-container">
               <Typography fontWeight="bold"  className="plant-container-header">Plant required</Typography>
               {items?.map((item: any) => (
                  <Typography >{item?.name}</Typography>
               ))}
            </Box>
         );
      } else {
         return null;
      }
   }

   const renderInfo = () => {
      const owners = (data.managers || []).concat(data.owner ? [data.owner] : [])
      let content = [
         <AvatarList 
            style={{marginLeft: '3px'}}
            size={24} users={owners.map((x) => {
            return {
               color: stringToColor(x.id),
               name: x.name
            }
         })} />
      ]

      if (data?.files && data?.files.length > 0) {
         content.push(<FileHex height={25} width={25} />)
      }
      return content;
   }

   return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
         {staffNames()}
         {plantItems()}

         <Box
            sx={{
               display: 'flex',
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'space-between',
            }}>
            {renderInfo()}
         </Box>
      </div>
   );
}