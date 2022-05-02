import { Box } from 'grommet';
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
            overflow="hidden"
            direction="column"
            className="week-header">
            <Box
                direction="row"
                justify={props.actions ? 'between' : 'center'}
                round={{ corner: 'top', size: 'xsmall' }}
                background="accent-1"
                align="center"
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
                background={"accent-2"}
                direction="row"
                className="week-header__days">
                <DayHeader />
            </Box>
        </Box>
    )
}