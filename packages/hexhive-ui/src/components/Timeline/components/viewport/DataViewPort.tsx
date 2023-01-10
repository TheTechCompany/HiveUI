import React, { createRef, useEffect, useRef, useState } from 'react';
import { DATA_CONTAINER_WIDTH } from '../../Const';
import DataTask from './DataTask';
import { DataRow } from './DataRow';
import DateHelper from '../../helpers/DateHelper';
import Config from '../../helpers/config/Config';
import { useContext } from 'react';
import { getBackgroundPosition, getBackgroundWidth } from '../../utils'
import { TimelineContext } from '../../context'
import styled from 'styled-components'
import useResizeAware from 'react-resize-aware'
import { Task } from '../../types';
import moment from 'moment';

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
import { Paper } from '@mui/material';

export interface DataViewPortProps {
  className?: string;

  interactiveMode?: boolean;

  onSize?: (dims: { width: number | null, height: number | null }) => void;
  onStartCreateLink?: (item: any, pos: any) => void;
  onFinishCreateLink?: (item: any, pos: any) => void;

  onTaskChanging?: (item: any) => void;
  onUpdateTask?: (task: Task, position: { start: Date, end: Date }) => void;

  onUpdateTaskOrder?: (task: Task, newIx: number, finished?: boolean) => void;
  onUpdateTaskOrderEnd?: () => void;
  onUpdateTaskOrderMove?: (task: Task, pos: number, over?: number) => void;

  mode?: string;

  onDown?: (e: { clientX: number, clientY: number }) => void;
  onMove?: (e: { clientX: number, clientY: number }) => void;
  onUp?: (e: { clientX: number, clientY: number }) => void;
  onCancel?: () => void;

}

export const BaseDataViewPort: React.FC<DataViewPortProps> = (props) => {

  const sensors = useSensors(
    useSensor(PointerSensor)
  )

  const dataViewRef = useRef<HTMLDivElement>(null)

  const [expanded, setExpanded] = useState<boolean>(false);

  const { onSelectItem, onCreateTask, selectedItem, nowposition, startRow, endRow, tasks, mode, style, dayWidth, itemHeight, moveTimeline, scrollLeft, scrollTop } = useContext(TimelineContext)


  const [childDragging, setChildDragging] = useState<boolean>(false)

  const [creatingTask, setCreatingTask] = useState<Task | null>(null);

  const reporter = (target?: HTMLElement | null) => {
    let dimensions = { width: target?.clientWidth || null, height: target?.clientHeight || null }
    if (dimensions.width && dimensions.height) props.onSize?.(dimensions)
    return dimensions
  }

  const [resizeListener, sizes] = useResizeAware(reporter)

  const getContainerHeight = (rows: number) => {
    let new_height = rows > 0 ? rows * itemHeight : 10;
    return new_height;
  }
  const onChildDrag = (dragging: boolean) => {
    setChildDragging(dragging)
  };

  const renderRows = () => {
    let result = [];

    for (let i = startRow; i < endRow + 1; i++) {
      let item = tasks?.[i];
      if (!item) break;
      //FIXME PAINT IN BOUNDARIES

      // console.log({item})

      if (moment(item.start).format('DD/MM') == moment(item.end).format("DD/MM")) {
        item.start?.setHours(0, 0);
        item.end?.setHours(23, 59);
      }

      let new_position = DateHelper.dateToPixel(item.start, nowposition, dayWidth || 0);
      let new_width = DateHelper.dateToPixel(item.end, nowposition, dayWidth || 0) - new_position;

      result.push(
        <DataRow
          item={item}
          interactiveMode={props.interactiveMode}
          onDragCreate={async (task: any, finished: boolean) => {
            setCreatingTask({ ...task, index: i })

            if (finished) {
              await onCreateTask?.(task, i)
              setCreatingTask(null);
            }
          }}
          isSelected={selectedItem == item}
          key={`data-row-${item.id}`}
          label={item.name}
          top={i * (itemHeight + 5)}
          left={20}
          expanded={expanded}
          itemheight={(itemHeight + 5)}>

          {(item.children || []).length > 0 ? item.children?.map((child_task, ix) => {

            if (moment(child_task.start).format('DD/MM') == moment(child_task.end).format("DD/MM")) child_task.end?.setHours(23, 59);

            let new_position = DateHelper.dateToPixel(child_task.start, nowposition, dayWidth || 0);
            let new_width = DateHelper.dateToPixel(child_task.end, nowposition, dayWidth || 0) - new_position;


            return (

              <DataTask
                interactiveMode={props.interactiveMode}
                item={child_task}
                nowposition={nowposition}
                dayWidth={dayWidth}
                color={child_task.color}
                opacity={child_task.opacity}
                width={new_width}
                left={new_position}
                height={itemHeight}
                label={child_task.name}
                onChildDrag={onChildDrag}
                isSelected={selectedItem == child_task}
                onSelectItem={onSelectItem}
                onStartCreateLink={props.onStartCreateLink}
                onFinishCreateLink={props.onFinishCreateLink}
                onTaskChanging={props.onTaskChanging}
                onUpdateTask={props.onUpdateTask}
              >
                {' '}
              </DataTask>)
          }) : (
            <DataTask
              interactiveMode={props.interactiveMode}
              onExpansion={(expanded: boolean) => setExpanded(expanded)}
              item={item}
              label={item.name}
              nowposition={nowposition}
              dayWidth={dayWidth}
              color={item.color}
              opacity={item.opacity}
              left={new_position}
              width={new_width}
              height={itemHeight}
              onChildDrag={onChildDrag}
              isSelected={selectedItem == item}
              onSelectItem={onSelectItem}
              onStartCreateLink={props.onStartCreateLink}
              onFinishCreateLink={props.onFinishCreateLink}
              onTaskChanging={props.onTaskChanging}
              onUpdateTask={props.onUpdateTask}
            >
              {' '}
            </DataTask >
          )}

          {i == (creatingTask as any)?.index &&
            <DataTask
              interactiveMode={props.interactiveMode}
              pointerEvents='none'
              item={creatingTask || undefined}
              width={DateHelper.dateToPixel(creatingTask?.end, nowposition, dayWidth || 0) - DateHelper.dateToPixel(creatingTask?.start, nowposition, dayWidth || 0)}
              left={DateHelper.dateToPixel(creatingTask?.start, nowposition, dayWidth || 0)}
              height={itemHeight}
            />
          }
        </DataRow>
      );
    }
    return result;
  };

  const renderCreateRow = () => {

    const i = (tasks?.length || 0);

    let item = {
      name: '',
      color: 'gray',

    };


    let new_position = DateHelper.dateToPixel(creatingTask?.start, nowposition, dayWidth || 0);
    let new_width = DateHelper.dateToPixel(creatingTask?.end, nowposition, dayWidth || 0) - new_position;

    return (
      <DataRow
        interactiveMode={props.interactiveMode}
        onDragCreate={async (task: any, finished: boolean) => {
          setCreatingTask({ ...task, index: i })
          if (finished) {
            await onCreateTask?.(task, i)
            setCreatingTask(null)
          }
        }}
        isSelected={selectedItem == item}
        key={`data-row-${i}`}
        label={item.name}
        item={item}
        top={i * (itemHeight + 5)}
        left={20}
        expanded={expanded}
        itemheight={(itemHeight + 5)}>

        <DataTask
          interactiveMode={props.interactiveMode}
        />
        {(creatingTask as any)?.index == i && <DataTask
          pointerEvents='none'
          item={creatingTask || undefined}
          width={new_width}
          left={new_position}
          interactiveMode={props.interactiveMode}
          height={itemHeight}
        />}
        {/* <DataTask
            onExpansion={(expanded: boolean) => setExpanded(expanded)}
            item={item}
            label={item.name}
            nowposition={nowposition}
            dayWidth={dayWidth}
            color={item.color}
            opacity={item.opacity}
            left={new_position}
            width={new_width}
            height={itemHeight}
            onChildDrag={onChildDrag}
            isSelected={selectedItem == item}
            onSelectItem={onSelectItem}
            onStartCreateLink={props.onStartCreateLink}
            onFinishCreateLink={props.onFinishCreateLink}
            onTaskChanging={props.onTaskChanging}
            onUpdateTask={props.onUpdateTask}
          >
            {' '}
          </DataTask> */}
      </DataRow>
    )
  }

  const onDown = (e: { clientX: number, clientY: number }) => {
    if (!childDragging) {
      props.onDown?.(e);
    }
  }

  const onMove = (e: { clientX: number, clientY: number }) => {
    props?.onMove?.(e) //, dataViewRef.current)
  }



  useEffect(() => {
    if (dataViewRef.current) dataViewRef.current.scrollLeft = 0;
  }, [])

  useEffect(() => {
    if (dataViewRef.current) {
      dataViewRef.current.scrollLeft = scrollLeft;
      dataViewRef.current.scrollTop = scrollTop;
      // console.log("Scroll data view", props.scrollTop, props.scrollLeft)
    }
  }, [scrollLeft, scrollTop])

  const backgroundStyle: any = (mode && style?.background) ? style?.background?.(mode, dayWidth || 0) : {
    background: `linear-gradient(
      to right,
      #5d9634,
      #5d9634 50%,
      #538c2b 50%,
      #538c2b
    )`,
    backgroundSize: `${(getBackgroundWidth(props.mode || 'month') * (dayWidth || 0)) * 2}px 100%`,
    backgroundPositionX: getBackgroundPosition(props.mode || 'month'),
  }

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {

      let overIndex = tasks?.findIndex((a) => a.id == over.id);

      let task = tasks?.find((a) => a.id == active.id);

      if(!task || overIndex == undefined) return;

      props.onUpdateTaskOrder?.(task, overIndex, true)

      // if(overIndex !== undefined){
      //   let nextTask = tasks?.[overIndex + 1]
      //   console.log({nextTask});
      // }

      //Find elem below or above

      //Send order change 



      // console.log(tasks?.findIndex((a) => a.id == over.id));
    }

    props.onUpdateTaskOrderEnd?.()
  }

  const handleDragOver = ({active, over}: any) => {
    if(active.id !== over.id){
      let overIndex = tasks?.findIndex((a) => a.id == over.id);
      let task = tasks?.find((a) => a.id == active.id);

      if(!task || overIndex == undefined) return;
      props.onUpdateTaskOrder?.(task, overIndex, false)
    }
  }

  const handleDragMove = ({active, over, delta}: any) => {
    let task = tasks?.find((a) => a.id == active.id);
    
    let overIndex = undefined;

    if(active.id !== over.id){
      overIndex = tasks?.findIndex((a) => a.id == over.id);
    }
    
    if(!task) return;

    props.onUpdateTaskOrderMove?.(task, delta.y, overIndex)
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={(tasks || []).map((x) => x.id || '')}
        strategy={verticalListSortingStrategy}
      >
        <Paper style={{
          position: 'absolute',
          left: 0,
          height: '100%',
          width: '200px',
          borderRadius: 0,
          zIndex: 0
          // boxShadow: '0px 5px 10px -5px gray'
        }} />
        <div
          ref={dataViewRef}
          id="timeLinedataViewPort"
          className={`${props.className} timeLine-main-data-viewPort`}
          onWheel={(evt) => {
            //
            moveTimeline?.((scrollLeft || 0) + evt.deltaX)
          }}
          onMouseDown={(e) => e.button == 0 && onDown(e)}
          onMouseMove={(e) => onMove(e)}
          onMouseUp={props.onUp}
          onMouseLeave={props.onCancel}
          onTouchStart={(e) => onDown(e.touches?.[0])}
          onTouchMove={(e) => onMove(e.touches?.[0])}
          onTouchEnd={(e) => props.onUp?.(e.touches?.[0])}
          onTouchCancel={props.onCancel}
        >

          {resizeListener}
          <div
            className="timeLine-main-data-container"
            style={{
              background: 'transparent',
              height: '100%',
              width: DATA_CONTAINER_WIDTH,
              maxWidth: DATA_CONTAINER_WIDTH
            }}
          >


            {renderRows()}
            {renderCreateRow()}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );

}

export const DataViewPort = styled(BaseDataViewPort)`
.timeLine-main-data-container{
  background: ;
  }

`

export default DataViewPort;


//sizeMe({ monitorWidth: true, monitorHeight: true })(DataViewPort);
