import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Timeline } from './TimeLine';
// import { BaseStyle } from '@hexhive/styles';
import { useState } from 'react';
import moment from 'moment';
import { Task } from './types';

export default {
  title: 'Components/Timeline',
  component: Timeline,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof Timeline>;

const Template: ComponentStory<typeof Timeline> = (args) => {
  const [ data, setData ] = useState<any>(args.data || [])
  const [ date, setDate ] = useState<Date>(new Date())

  const [ links, setLinks ] = useState<any[]>([]);

  console.log({links});
  
 return <Timeline 
      {...args} 
      data={data} 
      onUpdateTask={(task: any, position: any) => {
        // console.log("Updaate")
        // console.log({task})

        setTimeout(() => {
          let d = data.slice()
          let ix = d.map((x: any) => x.id).indexOf(task.id)
          d[ix].start = position.start;
          d[ix].end = position.end;
  
          setData(d)
        }, 5000)
   
      } } 
      links={links}
      onCreateLink={(link: any) => {
        setLinks([...links, link])
      }} date={date} onDateChange={setDate} />
      ;
}

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  color: 'green',
  size: '10px',
};

export const WithItems = Template.bind({});
WithItems.args = {
  date: new Date(),
  data: [
    {id: '1', start: new Date(), end: new Date(2022, 4, 10), name: "Item 1", color: 'red', showLabel: true},
    {id: '2', start: new Date(), end: new Date(2022, 10, 12), name: "Item 1", color: 'red', showLabel: true},
    {id: '3', start: new Date(), end: new Date(2022, 9, 12), name: "Item 1", color: 'red', showLabel: true}
  ],
  primary: true,
  color: 'green',
  size: '10px',
  dayStatus: (day: Date) => {
    // console.log("Day", day)
    return 'red';
  }
};

export const WithMultipleItems = Template.bind({});
WithMultipleItems.args = {
  date: new Date(),
  data: [
    {
      id: '1', start: new Date(2022, 6, 1), end: new Date(2022, 6, 6), name: "Item 0", color: 'red', showLabel: true, 
      children: [,
        {id: '2', start: new Date(2022, 6, 1), end: new Date(2022, 6, 5), name: "Item 1", color: 'red', showLabel: true},
        {id: '4', start: new Date(2022, 6, 6), end: new Date(2022, 6, 12), name: "Item 2", color: 'red', showLabel: true}
      ]
    }
  ],
  primary: true,
  color: 'green',
  size: '10px',
  dayStatus: (day: Date) => {
    // console.log("Day", day)
    return 'red';
  }
};

export const HeaderColors = Template.bind({});
HeaderColors.args = {
  date: new Date(),
  onCreateTask: (task: Task) => {
    console.log({task})
  },
  data: [
    {
      id: '1', 
      start: new Date(2021, 7, 12), 
      end: new Date(2021, 11, 12),
      name: "Item 1", 
      color: 'red', 
      showLabel: true
    },
    {
      id: '2', 
      start: new Date(2021, 6, 12), 
      end: new Date(2021, 10, 12),
      name: "Item 1", 
      color: 'red', 
      showLabel: true
    },
    {
      id: '3', 
      start: new Date(2021, 5, 12),
      end: new Date(2021, 9, 12),
      name: "Item 1", 
      color: 'red', 
      showLabel: true
    }
  ],
  primary: true,
  color: 'green',
  size: '10px',
  dayStatus: (day: Date) => {
    let weekEnd = moment(day).isoWeekday() == 6 || moment(day).isoWeekday() == 7
    // console.log("Day", day)
    return weekEnd ? 'green' : 'orange';
  }
};



export const ResizableSplitter = Template.bind({});
ResizableSplitter.args = {
  resizable: true,
  color: 'green',
  size: '10px',
};

