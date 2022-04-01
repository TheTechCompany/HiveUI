import React, {
  Component
} from 'react';

import { Box, Button, Text } from 'grommet'

import {
  Previous as ChevronLeft, Next as ChevronRight
} from 'grommet-icons'

import moment from 'moment';
// import './index.css';

export interface DateSelectorProps {
  value: Date;
  onChange: (value: Date) => void;
  stepSize?: moment.unitOfTime.DurationConstructor;
  displayFormat?: string;
}

export const DateSelector : React.FC<DateSelectorProps> = (props) => {
  
  const { value, displayFormat } = props;

  const change = (direction: number) => {
    const { value, onChange, stepSize } = props;
    var m = moment(value).add(direction, stepSize || 'months');
    onChange(m.toDate());
  }

  return (
      <Box direction="row" align="center" className="month-picker">
        <Button icon={<ChevronLeft />} onClick={() => change(-1)} />
   
        <Text className="month-picker__display">{moment(value).format(displayFormat)}</Text>
        <Button icon={<ChevronRight />} onClick={() => change(1)} />

      </Box>  
  )
}
