import React, {
  Component
} from 'react';
import { Box } from 'grommet'
import {TransferList} from '../../../components/TransferList';

export interface PeopleTabProps {
  onChange?: (items: any[]) => void;
  selected?: any[];

  assigned?: any[];
  options?: any[];
  labelKey?: string;
}

export const PeopleTab : React.FC<PeopleTabProps> = ({
  onChange,
  selected = [],
  assigned = [],
  options = [],
  labelKey
}) => {

  const not = (a: any[], b: any[]) => {
    return a?.filter(value => b?.map((x) => x.id).indexOf(value.id) === -1);
  }
  
  const onAdd = (items: any[]) => {
    let add = selected?.slice();
    onChange?.(add.concat(items));
  }

  const onRemove = (items: any[]) => {
    let remove = selected?.slice();
    onChange?.(not(remove, items));
  }


    return (
      <Box height="100%">
        <TransferList
          assignedKey={labelKey}
          assignedList={assigned || []}
          labelKey={labelKey}
          options={options || []}
          selected={selected}
          onAdd={onAdd}
          onRemove={onRemove} />
      </Box>
    );
  
}
