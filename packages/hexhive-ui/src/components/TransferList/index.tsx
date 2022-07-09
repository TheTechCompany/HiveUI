import React, {
  Component, useState
} from 'react';

import { Button, List, Typography, Checkbox, Box, IconButton, ListItemButton, ListItem } from '@mui/material'
import { ChevronRight as Next, ChevronLeft as Previous } from '@mui/icons-material'

export interface TransferListProps {
  onAdd?: any;
  onRemove?: any;

  assignedKey: any;
  assignedList: any[][];

  labelKey?: string;

  options: any;
  selected: any[];
}

// import './index.css';
export const TransferList : React.FC<TransferListProps> = (props) => {  
  const [ selectedLeft, setLeft ] = useState<any[]>([])
  const [ selectedRight, setRight ] = useState<any[]>([])


  const _addToDeselection = (item: any) => {
    let selected = selectedRight.slice();
    if(!selected.map((x) => x.id).includes(item)){
      selected.push(item)
    }else{
      var ix = selected.map((x) => x.id).indexOf(item.id);
      selected.splice(ix, 1);
    }
    setRight(selected)
  }

  const _addToSelection = (item: any) => {
    let selected = selectedLeft.slice();
    if(!selected.map((x) => x.id).includes(item.id)){
      selected.push(item)
    }else{
      var ix = selected.map((x) => x.id).indexOf(item.id);
      selected.splice(ix, 1);
    }
    setLeft(selected)
  } 

  const checkAssigned = (item: any) => { 
    var num = 0;

    props.assignedList.forEach((x) => {
      x.forEach((y) => {
        if(y[props.assignedKey] == item[props.assignedKey])
          num ++;
      });
    });

    if(num > 0){
      return (
      <Box>
        <div className="number-badge">
          {num}
        </div>
      </Box>
      );
    }else{
      return null;
    }
  }

  const _renderOptions = () => {
    return not(props.options, props.selected).map((x, ix) => [(
      <Box
        sx={{display: 'flex'}}
        key={'options' + ix}
        onClick={() => _addToSelection(x)}
        >
        <Checkbox 
          checked={selectedLeft.includes(x)}
          tabIndex={-1}
           />
        <Typography>
          {x[props.labelKey || '']}
        </Typography>
        {(props.assignedList) ? checkAssigned(x) : null}
      </Box>
    ), (<Box />)])
  }

  const _renderSelection = () => {
    return props.selected.map((x, ix) => (
      <Box
        sx={{display: 'flex'}}
        key={'selection' + ix}
        onClick={() => _addToDeselection(x)}>
        <Checkbox
          checked={selectedRight.includes(x)}
          tabIndex={-1}
           />
        <Typography>{x[props.labelKey || '']}</Typography>
      </Box>
    ))
  }
  

  const _addToOutput = () => {
    props.onAdd?.(selectedLeft);
    setLeft([])
  }

  const _addToInput = () => {
    props.onRemove?.(selectedRight);
    setRight([])
  }

  const not = (a: any[], b: any[]) => {
    return a.slice().filter(value => {
      return b.indexOf(value.id) === -1
    });
  }


    return (
      <Box 
        sx={{display: 'flex'}}>
        <Box sx={{display: 'flex', overflow: 'auto'}}>
          <List
            >
            {not(props.options, props.selected).map((item: any) => (
              <ListItem button onClick={() => _addToSelection(item)} sx={{display: 'flex', alignItems: 'center'}}>
                <Checkbox checked={selectedLeft.map((x) => x.id)?.indexOf(item.id) > -1} onChange={(e) => _addToSelection(item)} />
                <Typography>{item.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <IconButton 
            disabled={selectedLeft.length <= 0} 
            size="small"
            onClick={_addToOutput}>
              
              <Next />

            </IconButton>
          <IconButton 
            disabled={selectedRight.length <= 0} 
            size="small"
            onClick={_addToInput}>
              <Previous />
          </IconButton>
        </Box>
        <Box sx={{display: 'flex', overflow: 'auto'}}>
          <List>
            {props.selected.map((item) => (

              <ListItem  
                onClick={() => _addToDeselection(item)}
                button sx={{display: 'flex', alignItems: 'center'}}>
                <Checkbox checked={selectedRight.map((x) => x.id).indexOf(item.id) > -1} onChange={(e) => _addToDeselection(item)}/>
                <Typography>{item[props.labelKey || '']}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>  
    );
  
}
