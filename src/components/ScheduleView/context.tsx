import React from 'react';

export interface IScheduleViewContext {
    date?: Date;
    changeWeek?: (date: Date) => void;    
}

export const ScheduleViewContext = React.createContext<IScheduleViewContext>({})