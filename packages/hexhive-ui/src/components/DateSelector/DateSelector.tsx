import React, {
  Component
} from 'react';

import { Box, Button, IconButton, Typography } from '@mui/material'

import {
  ChevronLeft, ChevronRight
} from '@mui/icons-material'

import moment from 'moment';
// import './index.css';

export interface DateSelectorProps {
  value: Date;
  onChange?: (value: Date) => void;
  stepSize?: moment.unitOfTime.DurationConstructor;
  displayFormat?: string;
}

export const DateSelector : React.FC<DateSelectorProps> = (props) => {
  
  const { value, displayFormat } = props;

  const change = (direction: number) => {
    const { value, onChange, stepSize } = props;
    var m = moment(value).add(direction, stepSize || 'months');
    onChange?.(m.toDate());
  }

  return (
      <Box sx={{display: 'flex', alignItems: 'center'}} className="month-picker">
        <IconButton onClick={() => change(-1)}><ChevronLeft /></IconButton>
   
        <Typography className="month-picker__display">{moment(value).format(displayFormat)}</Typography>
        <IconButton onClick={() => change(1)}><ChevronRight /></IconButton>

      </Box>  
  )
}
