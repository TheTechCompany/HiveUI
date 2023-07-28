import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components'

import {Calendar, DateObject} from "react-multi-date-picker";

import moment from 'moment';
// import { gql, useApolloClient, useQuery } from '@apollo/client';


export interface CloneTabProps {
    project?: {displayId: string};

    selected?: Date[]; //Already selected
    onSelect?: (dates: Date[]) => void; //Select state is items changed

    className?: string;
}

const BaseCloneTab : React.FC<CloneTabProps> = ({
    selected = [],
    onSelect,
    className,
    project
}) => {
    const [ cloneSelected, setCloneSelected ] = useState<Date[]>([]);

    useEffect(()=> {
        if(selected){
            setCloneSelected(selected)
        }
    }, [selected])

    // const { data } = useQuery(gql`
    //     query GetScheduledDates ($project: String){
    //         scheduleItems(where: {project: $project}){
    //             date
    //         }
    //     }
    // `, {
    //     variables: {
    //         project: project?.displayId
    //     }
    // })

    // const client = useApolloClient();

    // const refetch = () => {
    //     client.refetchQueries({include: ['GetScheduledDates']})
    // }
    
    // useEffect(() => {
    //     refetch();
    // }, [])

    // const scheduledDates = data?.scheduleItems?.map((x) => x.date);

    // console.log({data})

    const onCloneSelect = (select: Date[]) => {
        
/*
        select = moment(select).add(2, 'hours').toDate(); 

        var selectedTimes = cloneSelected?.slice();
        var exists = false;

        for(var i = 0; i < selectedTimes.length; i++){
          if(select.getTime() == selectedTimes[i].getTime()){
            selectedTimes.splice(i, 1);
            exists = true;
          }
        }

        if(!exists){
            selectedTimes.push(select);
        }
        setCloneSelected(selectedTimes)
        */
        onSelect?.(select)

    }

    return (
    <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '3px',
            flex: 1
        }}
        className={className}>
        <Calendar
            currentDate={new DateObject()}
            className="calendar-contained"
            multiple
            // value={selected.concat(scheduledDates)}
            onChange={(dates) => {
                if(Array.isArray(dates)){
                    let d = dates.map((x) => x.valueOf())
                    // const existingDates = scheduledDates.map((x) => new Date(x).getTime());
                    // console.log({existingDates, d})
                    // const clone = d.filter((x) => existingDates.indexOf(x) < 0);
                    // console.log({clone})

                    //  onCloneSelect(Array.from(new Set(d)).map((x) => new Date(x)).filter((a) => existingDates.indexOf(a.getTime()) < 0))
                }
            }}
        />
    </Box>
    )
}

export const CloneTab = styled(BaseCloneTab)`
    .calendar-contained{
        height: 100%;
        width: 100%;
        display: flex;
        flex: 1;
    }

    .calendar-contained .rmdp-calendar{
        flex: 1;
    }

    .calendar-contained .rmdp-calendar > div:last-child{
        flex: 1;
        display: flex;
    }

    .calendar-contained .rmdp-calendar .rmdp-day-picker{
        flex: 1;
        flex-direction: column;
        display: flex;
        padding-left: 8px;
        padding-right: 8px;
        border: none;
    }

    .calendar-contained .rmdp-calendar .rmdp-day-picker > div{
        flex: 1;
    }

    .calendar-contained .rmdp-top-class {
        flex: 1;
    }

    .calendar-contained .rmdp-week-day {
        font-size: 18px;
    }

    .calendar-contained .rmdp-week {
        margin-bottom: 6px;
    }

    .calendar-contained .rmdp-day{
        height: 45px;
        width: 45px;

        & > span{
            font-size: 18px;

        }
    }
`
/*
  showHeader={false}
          Component={MultipleDateCalendar}
          interpolateSection={defaultMultipleDateInterpolation}
          displayOptions={{
            showOverlay: false
          }}
          selected={selected.concat(cloneSelected)}
          onSelect={onCloneSelect}
*/