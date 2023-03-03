import React, { Component, useRef, useState } from 'react';
import styled from 'styled-components';
import {config as Config} from '../../helpers/config/Config';
import { ChevronLeft as CaretLeftFill, ChevronRight as CaretRightFill } from '@mui/icons-material'

export interface VerticalSplitterProps {
  className?: string;
  enabled?: boolean;
  onTaskListSizing?: (delta: number) => void;
}

const BaseVerticalSpliter : React.FC<VerticalSplitterProps> = (props) => {
  const verticalRef = useRef<HTMLDivElement>(null)

  const dragging = useRef<boolean>(false)

  const [ isDragging, _setDragging ] = useState<boolean>(false)

  const setDragging = (val: boolean) => {
    dragging.current = val;
    _setDragging(val)
  }
  const draggingPosition = useRef<any>(0);


  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && props.enabled) {
      draggingPosition.current = e.clientX;
      setDragging(true)

      const cleanup = () => {
        setDragging(false)
        window.removeEventListener('mousemove', onMouseMove as EventListenerOrEventListenerObject)
        window.removeEventListener('mouseup', cleanup)
      }
      window.addEventListener('mousemove', onMouseMove as EventListenerOrEventListenerObject)
      window.addEventListener('mouseup', cleanup)
    }
  }


  const onMouseMove = (e: MouseEvent) => {
    if(dragging.current){ 
      e.stopPropagation();
      let bounds = draggingPosition.current || 0
      let delta = bounds - e.clientX;//
      draggingPosition.current = e.clientX;

    // if(delta > 0) console.log("delta", delta)
      props.onTaskListSizing?.(e.clientX + 6);
    }
    
  }


    return (
      <div 
        ref={verticalRef}
        className={`${props.className} ${props.enabled ? 'enabled': ''} ${isDragging == true ? 'dragging': ''}`} 
        style={Config.values.taskList.verticalSeparator.style} 
        onMouseDown={onMouseDown}
        >
          <CaretLeftFill />
          <CaretRightFill />
      
      </div>
    );
  
}


export const VerticalSpliter = styled(BaseVerticalSpliter)`
  width: 5px;
  transition: width 100ms ease-out;
  cursor: ${p => p.enabled ? 'col-resize' : 'auto'};

  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  & svg{
    transition opacity 100ms ease-out;
  }

  &:not(:hover) svg{
    opacity: 0;
  }

  &:hover svg{
    opacity: 1;
  }

  &.enabled:hover{
    width: 13px;
  }
  &.dragging{
    width: 13px;
  }
`