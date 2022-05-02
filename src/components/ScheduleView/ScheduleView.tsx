import React, {
  Component, useEffect, useState
} from 'react';

import { DateSelector } from '../DateSelector'

import {ScheduleCard} from './card';

import {  ScheduleModal, ISchedule } from '../../modals';
// import './index.css';

import {ScheduleHeader} from './header'

import { Box, Text, Button, Spinner } from 'grommet';
import { ScheduleContainer } from './container';
import { ScheduleViewContext } from './context';

var moment = require('moment');

export interface ScheduleViewProps {
  actions?: {left?: any, right?: any};
  onCreateItem?: (ts: Date) => void;
  onUpdateItem?: (item: any) => void;
  onDeleteItem?: (item: any) => void;

  onJoinCard?: (item: any) => void;
  onLeaveCard?: (item: any) => void;

  events?: ISchedule[];

  isLoading?: boolean;

  date?: Date;
  onHorizonChanged?: (start: Date, end: Date) => void;
}


export const ScheduleView: React.FC<ScheduleViewProps> = (props) => {
  const [modalShow, showModal] = useState(false)
  
  const [date, setDate] = useState(moment(props.date).startOf('isoWeek'))

  const [params, setParams] = useState<any[]>([moment().startOf('isoWeek'), moment().endOf('isoWeek')])

  //const [scheduleData, setScheduleData] = useState<any[]>([])

  const [scheduledJobs, setScheduledJobs] = useState<any[]>([]) //figure out where this goes

  const [selected, setSelected] = useState<any>()

  const [currentDay, setCurrentDay] = useState<any>()

  const [timestamp, setTimestamp] = useState(new Date())

  console.log(props.events)

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
    console.log("RENDER SCHEDULE", scheduleDay.format("DD/MM/yyyy"))
    return props.events?.filter((a) => {
      //console.log(a.date)
      return moment(a.date).isSame(scheduleDay, 'day')
    }).map((item: any, ix: number) => {
      return (
        <li style={{ padding: 0, marginBottom: 4 }}>
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
          style={{background: "#A3B696"}} 
          color="accent-2" 
          label="Create" 
          key={dayIndex} 
          className="add-item-button" 
          onClick={() => {
            var day = moment(params[0]).add(dayIndex, 'day')
            setTimestamp(day)
            setCurrentDay(dayIndex)

            // toggleEditorModal(true)

            props.onCreateItem?.(day);
          }
        } />
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
          pad={{horizontal: 'xsmall'}}
          flex
          className={(currentDay == renderTime(i, 'DD') && currentMonth == renderTime(i, 'MM')) ? ' week-day week-day-current' : 'week-day'}>
          <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', padding: 0 }} className='week-day-content'>
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
            flex
            justify="center"
            align="center">
            <Spinner size="medium" />
            <Text>Loading schedule ...</Text>
          </Box>
        ) : (
          <Box background="neutral-2" overflow={'scroll'} flex direction="row" className="week-days">
            {renderedDays}
            {/* {renderedModal} */}
          </Box>
        )}
    </ScheduleContainer>
    </ScheduleViewContext.Provider>
  );

}
