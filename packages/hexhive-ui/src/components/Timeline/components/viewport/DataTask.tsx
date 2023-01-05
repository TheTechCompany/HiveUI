import React, { Component, useCallback } from 'react';
import DateHelper from '../../helpers/DateHelper';
import { MODE_NONE, MODE_MOVE, MOVE_RESIZE_LEFT, MOVE_RESIZE_RIGHT } from '../../Const';
import { LINK_POS_LEFT, LINK_POS_RIGHT } from '../../Const';
import Config from '../../helpers/config/Config';
import { Box, Popover, Tooltip } from '@mui/material';
import { Task } from '../../types';
import styled from 'styled-components'
import { useState } from 'react';
import { useEffect } from 'react';
import { getHostForElement, stringToColor } from '@hexhive/utils';
import { useRef } from 'react';

export interface DataTaskProps {
  dayWidth?: number;
  item?: Task;
  label?: any;
  left?: number;
  width?: number;
  onStartCreateLink?: (item: any, pos: any) => void;
  onChildDrag?: any;
  onTaskChanging?: any;
  onFinishCreateLink?: any;
  onUpdateTask?: any;
  isSelected?: boolean;
  color?: any;
  opacity?: number;
  onSelectItem?: any;
  height?: any;
  nowposition?: any;

  className?: string;

  onExpansion?: (expanded: boolean) => void;
  pointerEvents?: string;
}

export interface DataTaskState {
  dragging: boolean;
  left: number;
  width: number;
  mode: any;
}

export const BaseDataTask: React.FC<DataTaskProps> = (props) => {

  const startTime = useRef<any>();

  const [hoverEl, setHoverEl] = useState<any>()

  const [collapsed, setCollapsed] = useState<boolean>(true)

  const draggingPosition = useRef<number>(0)

  const dragging = useRef<boolean>(false);

  const [ left, _setLeft ] = useState(props.left || 0);
  const [ width, _setWidth ] = useState(props.width || 0)

  const leftRef = useRef(props.left || 0)

  const setLeft = (left: number) => {
    _setLeft(left);
    leftRef.current = left;
  };

  const widthRef = useRef(props.left || 0)

  const setWidth = (width: number) => {
    _setWidth(width);
    widthRef.current = width;
  };
  
  const mode = useRef<number>(MODE_NONE);

  useEffect(() => {
    if (props.left) {
      setLeft(props.left)
    }
  }, [props.left])

  useEffect(() => {
    if (props.width) {
      setWidth(props.width)
    }
  }, [props.width])

  const onCreateLinkMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: string) => {
    if (e.button === 0) {
      e.stopPropagation();
      props.onStartCreateLink?.(props.item, position);
    }
  };

  const onCreateLinkMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: any) => {
    e.stopPropagation();
    props.onFinishCreateLink(props.item, position);
  };

  const onCreateLinkTouchStart = (e: React.TouchEvent<HTMLDivElement>, position: string) => {
    e.stopPropagation();
    props.onStartCreateLink?.(props.item, position);
  };

  const onCreateLinkTouchEnd = (e: React.TouchEvent<HTMLDivElement>, position: any) => {
    e.stopPropagation();
    props.onFinishCreateLink(props.item, position);
  };

  const updatePosition = () => {
    
    let new_start_date = DateHelper.pixelToDate(leftRef.current, props.nowposition, props.dayWidth || 0);
    let new_end_date = DateHelper.pixelToDate(leftRef.current + widthRef.current, props.nowposition, props.dayWidth || 0);

    props.onUpdateTask(props.item, { start: new_start_date, end: new_end_date });

  }


  const dragStart = (x: any, _mode: any) => {
    props.onChildDrag(true);
    draggingPosition.current = x;
    dragging.current = true
    mode.current = _mode

    setLeft(props.left || 0)
    setWidth(props.width || 0)

  }

  const dragCancel = () => {
    props.onChildDrag(false);
    dragging.current = false
    mode.current = MODE_NONE
  }

  const dragProcess = (x: number) => {
    let delta = draggingPosition.current - x;

    let newLeft = leftRef.current;

    switch (mode.current) {
      case MODE_MOVE:
        newLeft = newLeft - delta;
        break;
      case MOVE_RESIZE_LEFT:
        newLeft = newLeft - delta;
        break;
      default: 
        break;
        // return left;
    }

    setLeft(newLeft)

    let newWidth = widthRef.current;

    switch (mode.current) {
      case MOVE_RESIZE_LEFT:
        newWidth = newWidth + delta;
        break;
      case MOVE_RESIZE_RIGHT:
        newWidth = newWidth - delta;
        break;
      default: 
        break;
        // return width;
    }

    setWidth(newWidth)
    
    //the coordinates need to be global
    let changeObj = {
      item: props.item,
      position: {
        startInt: leftRef.current - props.nowposition,
        start: DateHelper.pixelToDate(leftRef.current , props.nowposition, props.dayWidth || 0),
        end: DateHelper.pixelToDate(leftRef.current  + widthRef.current, props.nowposition, props.dayWidth || 0),
        endInt: leftRef.current + widthRef.current - props.nowposition
      }
    };

    //updatePosition() REMINDER/TODO this will make continuous date updates through props as a node moves, disabled for now to make data linking easier

    props.onTaskChanging(changeObj);
    draggingPosition.current = x;

  }

  const dragEnd = () => {
    props.onChildDrag(false);
    
    updatePosition()

    dragging.current = false
    mode.current = MODE_NONE

  }

  const doMouseDown = (e: React.MouseEvent<HTMLDivElement>, mode: number) => {
    if (!props.onUpdateTask) return;

    let host = getHostForElement(e.target as HTMLElement)

    
    if (e.button === 0) {
      e.stopPropagation();

      if(mode == MODE_MOVE){
        //Set timeout to send select event if drag does not start
        startTime.current = new Date().getTime();
        
        // setTimeout(() => {
        //   // console.log("Select")
          
        // }, 200)

      }

      dragStart(e.clientX, mode);

      const doMouseUp = () => {
        if(startTime.current && startTime.current > new Date().getTime() - 200){
          dragCancel()
          props.onSelectItem(props.item)

        }else{
          dragEnd();
        }
        host.removeEventListener('mousemove', doMouseMove as EventListenerOrEventListenerObject)
        host.removeEventListener('mouseup', doMouseUp as EventListenerOrEventListenerObject)
      };

      host.addEventListener('mousemove', doMouseMove as EventListenerOrEventListenerObject)
      host.addEventListener('mouseup', doMouseUp as EventListenerOrEventListenerObject)

    }
  };

  const doMouseMove = (e: MouseEvent) => {
    if (dragging) {
      e.stopPropagation();
      // clearTimeout(selectTimeout.current)
      startTime.current = null;
      dragProcess(e.clientX);
    }
  };



  const doTouchStart = (e: React.TouchEvent<HTMLDivElement>, mode: number) => {
    if (!props.onUpdateTask) return;
    e.stopPropagation();
    dragStart(e.touches[0].clientX, mode);
  };


  const generateStripes = (colors: { color: string, percent: number }[]) => {
    let c = colors.sort((a, b) => b.percent - a.percent)

    if (c.length <= 0) return stringToColor(`${props.item?.name}`)

    let gradient: any[] = [];
    let current_stop = 0;

    c.forEach((x, ix) => {
      gradient.push(`${x.color} ${current_stop * 100}%`)
      gradient.push(`${x.color} ${(current_stop * 100) + (x.percent * 100)}%`)
      current_stop += x.percent;
    })
    let output = `linear-gradient(90deg, ${gradient.join(', ')})`
    return output;
  }


  const calculateStyle = () => {
    let configStyle = props.isSelected ? Config.values.dataViewPort.task.selectedStyle : Config.values.dataViewPort.task.style;
    let backgroundColor = props.color ? Array.isArray(props.color) ? generateStripes(props.color) : props.color : configStyle.backgroundColor;

    // if (this.state.dragging) {
    return {
      ...configStyle,
      background: backgroundColor,
      opacity: props.opacity || 1,
      // left: left,
      width: width,
      height: props.height - 5,
    };
    // } 
    /*else {
      return { ...configStyle, backgroundColor, left: this.props.left, width: this.props.width, height: this.props.height - 5 };
    }*/
  }


  const hoverStart = (e: any) => {
    e.stopPropagation()
    // e.stopImmediatePropagation()
    // e.preventDefault()
    setHoverEl(e.currentTarget)

    //      this.setState({hovering: state})
  }

  const hoverEnd = (e: any) => {
    setHoverEl(null)
  }


  const style = calculateStyle();

  const Wrapper = props.item?.hoverInfo ? (props: any) => <Tooltip title={(
    <Box
    sx={{ zIndex: 999999999, boxShadow: '5px 5px 15px -5px #000' }}
    >
    {props.item?.hoverInfo}
  </Box>
  )}>{props.children}</Tooltip> : (props: any) => <>{props.children}</>;

  return (

    <Wrapper>
       

      <Box
        onMouseEnter={hoverStart}
        onMouseLeave={hoverEnd}
        className={`timeLine-data-task-container ${props.className} ${dragging.current ? 'dragging' : ''}`}
        onMouseDown={(e) => doMouseDown(e, MODE_MOVE)}
        onTouchStart={(e) => doTouchStart(e, MODE_MOVE)}
        onDoubleClick={(e) => {
          props.onSelectItem(props.item);
        }}
        style={{
          position: 'absolute',
          top: 0,
          paddingTop: '6px',
          paddingBottom: '6px',
          display: 'flex',
          height: props.height - 5,
          left: left,
          width: width,
          pointerEvents: props.pointerEvents as any
        }}
      >
        <div
          className="timeLine-main-data-task-side"
          style={{ position: 'relative', top: 0, left: -10, height: style.height }}
          onMouseDown={(e) => doMouseDown(e, MOVE_RESIZE_LEFT)}
          onTouchStart={(e) => doTouchStart(e, MOVE_RESIZE_LEFT)}
        >
          {/* <div className="task-handle" style={{ right: 0 }} />
          <div className="task-handle-grip" /> */}

        </div>
        <div
          style={{ position: 'absolute', zIndex: 999, borderBottomLeftRadius: '12px', borderTopLeftRadius: '12px', left: 0, bottom: 0, top: 6 }}
          onMouseUp={(e) => onCreateLinkMouseUp(e, LINK_POS_LEFT)}
          onTouchEnd={(e) => onCreateLinkTouchEnd(e, LINK_POS_LEFT)}
          className='timeLine-main-data-task-side-link-container'>
            {/* <div
              style={{ position: 'absolute', margin: 'auto 0', top: '8px', left: '-4px' }}
              className="timeLine-main-data-task-side-linker"
            /> */}
        </div>
       

        <div onClick={() => {
          props.onExpansion?.(!collapsed)
          setCollapsed(!collapsed)
        }} 
        className={`timeline-data-task`}  
        style={{
          ...style,
           display: 'flex', 
           flex: 1, 
           justifyContent: 'center', 
           alignItems: 'center', 
           flexDirection: 'column',
           overflow: 'hidden' ,
           
          }}>
          {props.item?.showLabel ? ((typeof (props.item?.showLabel) === 'string') ? props.item.showLabel : props.item?.name) : ''}
          {/* {props.item?.collapsibleContent && (
              <Collapsible open={!collapsed}>
                {props.item.collapsibleContent}
              </Collapsible>
            )} */}
        </div>

    
       
        <div
          style={{ position: 'absolute', zIndex: 999, left: style.width - 12, borderTopRightRadius: '12px', borderBottomRightRadius: '12px', bottom: 0, top: 6 }}
          onMouseDown={(e) => onCreateLinkMouseDown(e, LINK_POS_RIGHT)}
          onTouchStart={(e) => onCreateLinkTouchStart(e, LINK_POS_RIGHT)}
          className='timeLine-main-data-task-side-link-container'>
              {/* <div
                style={{ position: 'absolute', top: '8px', left: '6px', margin: 'auto 0' }}
                className="timeLine-main-data-task-side-linker"

              /> */}
        </div>
        <div
          className="timeLine-main-data-task-side"
          style={{ position: 'relative', top: 0, left: style.width, height: style.height }}
          onMouseDown={(e) => doMouseDown(e, MOVE_RESIZE_RIGHT)}
          onTouchStart={(e) => doTouchStart(e, MOVE_RESIZE_RIGHT)}
        >
          {/* <div className="task-handle-grip" />
          <div className="task-handle" style={{ marginLeft: '100%' }} /> */}
        </div>
      </Box>
      </Wrapper>
  );

}


export default styled(BaseDataTask)`

  .timeLine-main-data-task-side > .task-handle,   .timeLine-main-data-task-side > .task-handle-grip {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  &:hover .timeLine-main-data-task-side > .task-handle {
    opacity: 1;
    background: blue;
    width: 3px;
    height: 100%;
  }

  &:hover  .timeLine-main-data-task-side > .task-handle-grip{
    position: absolute;
    opacity: 1;
    height: 3px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 100%;
    background-color: blue;
  }

  &.dragging .timeLine-main-data-task-side > .task-handle {
    opacity: 1;
    background: blue;
    width: 3px;
    height: 100%;
  }
  
  &.dragging  .timeLine-main-data-task-side > .task-handle-grip{
    position: absolute;
    opacity: 1;
    height: 3px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 100%;
    background-color: blue;
  }
` 