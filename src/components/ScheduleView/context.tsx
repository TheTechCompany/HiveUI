import React from 'react';

export interface IScheduleViewContext {
    projects?: any[];
    people?: any[];
    equipment?: any[];

    date?: Date;
    changeWeek?: (date: Date) => void;    
}

export const ScheduleViewContext = React.createContext<IScheduleViewContext>({})