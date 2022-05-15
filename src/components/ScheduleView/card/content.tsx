import { Box, Text } from 'grommet';
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
               align="center"
               direction="column"
               className="staff-container">
               {names.map((item: any) => item && (
                  <Text size='small'>{item?.name}</Text>
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
            <Box direction="column" className="plant-container">
               <Text weight="bold" size="small" className="plant-container-header">Plant required</Text>
               {items?.map((item: any) => (
                  <Text size='small'>{item?.name}</Text>
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
         <AvatarList size={24} users={owners.map((x) => {
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
            direction="row"
            align="center"
            justify="between">
            {renderInfo()}
         </Box>
      </div>
   );
}