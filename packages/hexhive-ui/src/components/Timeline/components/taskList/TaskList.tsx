import { Box, Divider, List } from '@mui/material';
import React, { Component, useEffect } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { TimelineContext } from '../../context';
import Config from '../../helpers/config/Config';
import { Task } from '../../types';
import { TaskRow } from './TaskRow'

import {
  closestCenter,
  useSensors,
  useSensor,
  DndContext,
  PointerSensor
} from '@dnd-kit/core'

import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'


export class VerticalLine extends Component<any, any>{
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="timeLine-main-data-verticalLine" style={{ left: this.props.left }} />;
  }
}

//Task Lis

const TaskList: React.FC<any> = (props) => {
  const taskViewRef = useRef<HTMLDivElement>(null)

  const { tasks, itemHeight } = useContext(TimelineContext)

  const getContainerStyle = (rows: number) => {
    let new_height = rows > 0 ? rows * ((itemHeight || 0) + 5) : 10;
    return { height: new_height };
  }

  const sensors = useSensors(
    useSensor(PointerSensor)
  )

  const renderTaskRow = (item: Task, i: number) => {
    // let result = [];
    // for (let i = props.startRow; i < props.endRow + 1; i++) {
    //   let item = data[i];
    //   if (!item) break;
    return (
      <TaskRow
        key={item.id}
        index={i}
        item={item}
        label={item.name}
        top={i * ((itemHeight || 0) + 5)}
        itemheight={itemHeight}
        isSelected={props.selectedItem == item}
        onUpdateTask={props.onUpdateTask}
        onSelectItem={props.onSelectItem}
        nonEditable={props.nonEditable}
      />
    );

  }

  const doScroll = (e: any) => {
    props.onScroll(e.target.scrollTop);
    // if(taskViewRef.current) props.onScroll(taskViewRef.current.scrollTop);
  };

  //Setup scroll listener for task list
  useEffect(() => {
    taskViewRef.current?.addEventListener('scroll', doScroll)

    return () => {
      taskViewRef.current?.removeEventListener('scroll', doScroll)
    }
  }, [])

  const containerStyle = getContainerStyle((tasks || []).length);

  return (
    <Box className="timeLine-side">
      <Box
        height={'60px'}
        sx={{
          height: '60px',
          display: 'flex',
          background: '#333',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <div>{Config.values.taskList.title.label}</div> */}
      </Box>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
      >
        <SortableContext
          items={(tasks || []).map((x) => x.id || '')}
          strategy={verticalListSortingStrategy}
        >
          <List
            className="timeLine-side-task-viewPort"
            onScroll={doScroll}>
            {(tasks || []).map((datum, ix) => [renderTaskRow(datum, ix), <Divider />]).concat([renderTaskRow({}, (tasks || []).length), <Divider />])}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
  );

}

export default TaskList