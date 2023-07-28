import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { DateSelector } from '../../DateSelector';
import { ScheduleViewContext } from '../context';
import { DayHeader } from './days'

export interface ScheduleHeaderProps {
    actions?: {left?: any, right?: any};
}

export const ScheduleHeader : React.FC<ScheduleHeaderProps> = (props) => {

    const { date, changeWeek } = useContext(ScheduleViewContext);
    
    return (
        <Box
            sx={{
                bgcolor: 'secondary.main',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}
            className="week-header">
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: props.actions ? 'space-between' : 'center',
                    alignItems: "center"
                }}
             
                className="week-header__controls">
                {props.actions && (props.actions.left || <div />)}
                <DateSelector
                    value={date || new Date()}
                    displayFormat={"MMMM YYYY"}
                    stepSize={"week"}
                    onChange={changeWeek} />
                {props.actions && (props.actions.right || <div />)}
            </Box>
            <Box
                sx={{display: 'flex', bgcolor: 'secondary.dark', justifyContent: 'space-between'}}
                className="week-header__days">
                <DayHeader />
            </Box>
        </Box>
    )
}