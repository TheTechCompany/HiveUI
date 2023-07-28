import React from 'react'
import { Box } from '@mui/material';

import { IconButton, Button, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Close, Add } from '@mui/icons-material'

export interface NoteTabProps {
  data?: any[];
  onChange?: Function;
}

export const NoteTab: React.FC<NoteTabProps> = (props) => {

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
    <Box sx={{
      display: 'flex',
      minHeight: '50vh',
      padding: '3px',
      overflow: 'auto'
    }} 
    className="note-tab">

        {props.data?.map((item: any, index: number) => (
          <Box sx={{display: 'flex', alignItems: "center"}} >
            <TextField
              key={`${index}`}
              multiline
              // autoFocus
              fullWidth
              // focusIndicator={false}
              value={item}
              placeholder="Enter note here..."
              // onKeyDown={(e) => { if (e.key == 'Enter') { _insertEmpty() } }}
              onChange={(e) => _onChange(index, e.target.value)}
            />
            <IconButton
              onClick={() => _removeItem(index)}
              >
              <Close />
            </IconButton>
          </Box>
        ))}
      <Button
        endIcon={<Add fontSize="small" />}
        sx={{alignItems: 'center'}}
        onClick={_insertEmpty}>
          Add Note  
      </Button>
    </Box>
  );

}
