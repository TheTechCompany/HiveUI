import React from 'react'
import { List, Box, Button, TextField, IconButton } from '@mui/material';

import { Close, Add } from '@mui/icons-material'

export interface NoteTabProps {
  data?: any[];
  onChange?: Function;
}

const NoteTab: React.FC<NoteTabProps> = (props) => {

  const _onChange = (ix: number, val: string) => {
    let data = props.data?.slice() || []
    data[ix] = val;
    props.onChange?.(data);
  }


  const _insertEmpty = () => {
    let data = props.data?.slice() || [];
    data.push('')
    props.onChange?.(data)
  }

  const _removeItem = (index: number) => {
    let data = props.data?.slice() || [];
    data.splice(index, 1);
    props.onChange?.(data);
  }

  return (
    <Box sx={{overflow: 'auto', minHeight: '50vh'}} className="note-tab">
      <List>
          {props.data?.map((datum, index) => (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <TextField
                autoFocus
                value={datum}
                placeholder="Enter note here..."
                onKeyDown={(e) => { if (e.key == 'Enter') { _insertEmpty() } }}
                onChange={(e) => _onChange(index, e.target.value)}
              />
              <IconButton onClick={() => _removeItem(index)} >
                <Close />
              </IconButton>
            </Box>
          ))}
        
      </List>
      <Button
        onClick={_insertEmpty}
        startIcon={<Add />} 
      >Add Note</Button>
    </Box>
  );

}

export default NoteTab;