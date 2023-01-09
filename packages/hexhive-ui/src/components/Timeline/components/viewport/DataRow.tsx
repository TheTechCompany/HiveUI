import { Box, Typography } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { Component } from "react";
import Config from '../../helpers/config/Config';
import { HexHiveTheme } from '@hexhive/styles'
import { DataTaskPlaceholder } from "./DataTaskPlaceholder";
import DateHelper from "../../helpers/DateHelper";
import { TimelineContext } from "../../context";
import { nanoid } from 'nanoid';
import { DragHandle } from "@mui/icons-material";
import { CSS } from '@dnd-kit/utilities';

import { useSortable } from '@dnd-kit/sortable'
import { Task } from "../../types";

export interface DataRowProps {
  interactiveMode?: boolean;
  isSelected?: boolean;
  label?: string;
  item: Task;
  onDragCreate?: ((task: Task, finished: boolean) => Promise<void>)
  top?: number;
  left?: number;
  expanded?: boolean;
  itemheight: number;
}

export const DataRow: React.FC<DataRowProps> = (props: any) => {

  const { nowposition, dayWidth, onDragCreate } = useContext(TimelineContext)
  const [hoverAnchor, setHoverAnchor] = useState<{ x: number, y: number } | null>(null);

  const [ isHovering, setHover ] = useState(false);

  const id = nanoid()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.item?.id || 'asdf' });


  const style = {
    transform: `translateY(${transform?.y}px) scaleX(${transform?.scaleX}) scaleY(${transform?.scaleY})`, //{CSS.Transform.toString(transform),
    transition
  }


  const label = useMemo(() => {
    if ((props.label || '').length > 30) {
      return props.label?.substring(0, 30) + "...";
    }
    return props.label;
  }, [props.label])


  return (
    <Box 
   
    sx={{
      ...style,
      // zIndex: 9,
      display: 'flex',
      // top: props.top,
      height: props.itemheight + 2,
      position: 'relative',
      // marginBottom: '2px',
      // borderBottom: `2px dashed ${HexHiveTheme.palette.secondary.main + "42"}`,
      // strokeDasharray: 1000,
      // strokeDashoffset: 1000
    }}>
      <Box
        // ref={setNodeRef}
        // {...attributes}
        // {...listeners}
        sx={{
          // ...style,
          '&:hover .drag-handle': {
            opacity: 1,
          },
          // marginTop: '2px',
          bgcolor: 'background.paper',
          cursor: 'pointer',
          display: 'flex', 
          alignItems: 'center',
          // background: 'white', 
          zIndex: 1, 
          // height: '100%', 
          position: 'sticky', 
          height: props.itemheight + 2,
          left: 0, 
          // borderBottom: '2px solid gray',
          // boxShadow: `0px 2px 5px -5px gray`,
          // borderLeft: '1px solid black',
          // transform: 'translateZ(1px)',
          width: '200px'
        }}>
          <DragHandle 
            ref={setNodeRef as any}
            {...attributes}
            {...listeners}  
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            fontSize="small" 
            sx={{opacity: 0, marginRight: '6px'}}
            className="drag-handle" />
          <div className="color-dot" style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            marginRight: 8,
            background: props.item.color as string
          }} />
        {/* this.props.nonEditable */}
        
          <Box sx={{ display: 'flex', whiteSpace: 'no-wrap', justifyContent: 'flex-start' }} tabIndex={props.index} >
            <Typography textOverflow={'ellipsis'} fontSize={"10px"} >{label}</Typography>
          </Box>
        
        {/* <Typography fontSize={"small"}>{props.label}</Typography> */}
      </Box>
    <Box
      onMouseEnter={(e: any) => {
        
        setHover(true);

        if (!e.target.classList.contains('timeline-data-task') && !e.target.classList.contains('timeLine-data-task-container') && !e.target.classList.contains('timeLine-main-data-task-side') && !e.target.classList.contains('timeLine-main-data-task-side-link-container') && !props.interactiveMode) {
          setHoverAnchor({ x: e.layerX, y: e.layerY })
        }
          
          const moveAnchor = (e: any) => {
            // console.log({e})
            if (!e.target.classList.contains('timeline-data-task') && !e.target.classList.contains('timeLine-data-task-container') && !e.target.classList.contains('timeLine-main-data-task-side') && !e.target.classList.contains('timeLine-main-data-task-side-link-container') && !props.interactiveMode) {
              setHoverAnchor({ x: e.layerX, y: e.layerY })
            }else{
              setHoverAnchor(null)
            } 
          }

          e.currentTarget.addEventListener('mousemove', moveAnchor)

          const mouseLeave = (e: any) => {
            setHoverAnchor(null)
            setHover(false);
            e.currentTarget.removeEventListener('mousemove', moveAnchor);
            e.currentTarget.removeEventListener('mouseleave', mouseLeave)
          }
          e.currentTarget.addEventListener('mouseleave', mouseLeave)
        
      }}
      onMouseDown={(e: any) => {
        e.stopPropagation()

        let element = e.currentTarget;

        let startDate = DateHelper.pixelToDate(e.nativeEvent.layerX, nowposition, dayWidth || 0)
        let endDate: Date;

        const mouseMove = (e: any) => {
          // console.log({e})

          endDate = DateHelper.pixelToDate(e.layerX, nowposition, dayWidth || 0)

          props.onDragCreate?.({
            id: id,
            start: startDate,
            end: endDate,
          }, false)
          // console.log({date})
        }

        const mouseUp = (e: any) => {

          props.onDragCreate?.({
            id: id,
            start: startDate,
            end: endDate,
          }, true)

          element.removeEventListener('mousemove', mouseMove)
          element.removeEventListener('mouseup', mouseUp)
        }
        element.addEventListener('mousemove', mouseMove);

        element.addEventListener('mouseup', mouseUp);

      }}
      className="timeLine-main-data-row"
      style={{
        ...Config.values.dataViewPort.rows.style,
        // top: props.top,
        zIndex: -1,
        marginLeft: '200px',
        height: props.itemheight,
        borderBottom: `2px dashed ${HexHiveTheme.palette.secondary.main + "42"}`,
        strokeDasharray: 1000,
        strokeDashoffset: 1000
      }}
    >
     
      {hoverAnchor && (
        <>
          <div style={{ position: 'absolute', background: 'gray', opacity: '0.2', left: 0, top: 0, bottom: 0, right: 0 }} />
          <DataTaskPlaceholder top={'30%'} left={hoverAnchor.x} />
        </>
      )}
      {props.children}
    </Box>
    </Box>
  );
}
