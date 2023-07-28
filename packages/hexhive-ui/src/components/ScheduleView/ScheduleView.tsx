import React, {
  Component, useEffect, useState
} from 'react';

import { DateSelector } from '../DateSelector'

import {ScheduleCard} from './card';

// import './index.css';
import { ScheduleItem } from './types';

import {ScheduleHeader} from './header'

import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { ScheduleContainer } from './container';
import { ScheduleViewContext } from './context';

var moment = require('moment');

export interface ScheduleViewProps {
  actions?: {left?: any, right?: any};
  onCreateItem?: (ts: Date) => void;
  onUpdateItem?: (item: any) => void;

  events?: ScheduleItem[];

  isLoading?: boolean;

  date?: Date;
  onHorizonChanged?: (start: Date, end: Date) => void;
}


export const ScheduleView: React.FC<ScheduleViewProps> = (props) => {
  const [modalShow, showModal] = useState(false)
  
  const [date, setDate] = useState(moment(props.date).startOf('isoWeek'))

  const [params, setParams] = useState<any[]>([moment().startOf('isoWeek'), moment().endOf('isoWeek')])

  useEffect(() => {
    if(props.date){
      setDate(moment(props.date).startOf('isoWeek'))
    }
  }, [props.date])


  const changeWeek = (week: Date) => {
    let params = [moment(week).startOf('isoWeek'), moment(week).clone().endOf('isoWeek')]
    setDate(moment(week).startOf('isoWeek'))
    setParams(params)

    props.onHorizonChanged?.(new Date(params[0].valueOf()), new Date(params[1].valueOf()))
  }


  const renderTime = (i: number, format: string) => {
    var m = moment(params[0]);
    var d = m.add(i, 'day');
    return d.format(format);
  }


  const renderSchedule = (i: number) => {
    let scheduleDay = moment(date).clone().add(i, 'days')

    return props.events?.filter((a) => {
      return moment(a.date).isSame(scheduleDay, 'day')
    })?.sort((a, b) => {
      return (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
    }).map((item: any, ix: number) => {
      return (
        <li style={{ padding: 0,  display: 'flex', marginBottom: 4 }}>
          <ScheduleCard
            onClick={() => {
              // if (!props.user.readonly) {

            //    setScheduledJobs(scheduleData[i])
              props.onUpdateItem?.(item)
                // toggleEditorModal(true, x);

              // } else {
                // toggleEditorModal(true, x)
              // }

            }}
            key={ix}
            data={item} />
        </li>
      );
    });
  }

  const renderAddScheduleButton = (dayIndex: number) => {

    //if (!props.user.readonly) {
      return (
        <Button  
  
          key={dayIndex} 
          className="add-item-button" 
          onClick={() => {
            var day = moment(params[0]).add(dayIndex, 'day')
            // toggleEditorModal(true)

            props.onCreateItem?.(day);
          }
        }>
          Create
        </Button> 
      );
    // } else {
    //   return null;
    // }
  }

 

  const renderDays = () => {
    var week = [];
    for (var i = 0; i < 7; i++) {
      const dayItems =  renderSchedule(i);
      var today = new Date();
      var currentDay = today.getDate();
      var currentMonth = today.getMonth() + 1;
      week.push((
        <Box
          sx={{display: 'flex', flex: 1, marginRight: '4px', marginLeft: '4px'}}
          className={(currentDay == renderTime(i, 'DD') && currentMonth == renderTime(i, 'MM')) ? ' week-day week-day-current' : 'week-day'}>
          <ul style={{ display: 'flex', flex: 1, flexDirection: 'column', listStyle: 'none', padding: 0 }} className='week-day-content'>
            {dayItems}
            {renderAddScheduleButton(i)}
          </ul>
        </Box>
      ));
    }
    return week;
  }

  const renderedDays = renderDays()
  // const renderedModal = renderCreateScheduleModal()

  return (
    <ScheduleViewContext.Provider
      value={{
          changeWeek,
          date
      }}>
    <ScheduleContainer
      header={<ScheduleHeader  actions={props.actions} />}>
      {props.isLoading ? (
          <Box
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress size="medium" />
            <Typography>Loading schedule ...</Typography>
          </Box>
        ) : (
          <Box sx={{display: 'flex', flex: 1, justifyContent: 'space-between', overflow: 'auto'}} className="week-days">
            {renderedDays}
            {/* {renderedModal} */}
          </Box>
        )}
    </ScheduleContainer>
    </ScheduleViewContext.Provider>
  );

}
