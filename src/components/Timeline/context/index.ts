import React from "react";
import { Link, Task, TimelineStyle } from "../types";

export interface ITimelineContext {
    moveTimeline?: (new_x: number) => void;
    scrollLeft: number;
    scrollTop: number;

    startRow: number;
    endRow: number;

    nowposition: number;

    selectedItem?: any;
    onSelectItem?: (item: any) => void;

    style?: TimelineStyle

    mode?: string;

    links?: Link[];
    tasks?: Task[];

    dayWidth?: number;

    itemHeight: number;

    changeMode?: (mode: string) => void;
}   

export const TimelineContext = React.createContext<ITimelineContext>({
    itemHeight: 30,
    scrollLeft: 0,
    scrollTop: 0,
    startRow: 0,
    endRow: 50,
    nowposition: 0
})