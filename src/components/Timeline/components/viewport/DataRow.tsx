import { Box } from "@mui/material";
import React, {useContext, useState} from "react";
import { Component } from "react";
import Config from '../../helpers/config/Config';
import {BaseStyle} from '@hexhive/styles'
import { DataTaskPlaceholder } from "./DataTaskPlaceholder";
import DateHelper from "../../helpers/DateHelper";
import { TimelineContext } from "../../context";
import { nanoid } from 'nanoid';

export default (props: any) => {

  const { nowposition, dayWidth, onDragCreate } = useContext(TimelineContext)
    const [ hoverAnchor, setHoverAnchor ] = useState<{x: number, y: number} | null>(null);

    const id = nanoid()

      return (
        <Box
          onMouseEnter={(e: any) => {

            setHoverAnchor({x: e.layerX, y: e.layerY})
            const moveAnchor = (e: any) => {
              // console.log({e})
              setHoverAnchor({x: e.layerX, y: e.layerY})
            }
            e.currentTarget.addEventListener('mousemove', moveAnchor)

            const mouseLeave = (e: any) => {
              setHoverAnchor(null)
              e.currentTarget.removeEventListener('mousemove', moveAnchor);
              e.currentTarget.removeEventListener('mouseleave', mouseLeave)
            }
            e.currentTarget.addEventListener('mouseleave', mouseLeave)
          }}
          onMouseLeave={() => {
            setHoverAnchor(null)
          }}
          onMouseDown={(e: any) => {
            e.stopPropagation()

            let element = e.currentTarget;

            let startDate = DateHelper.pixelToDate(e.nativeEvent.layerX, nowposition, dayWidth || 0)
            let endDate : Date;

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
              top: props.top, 
              height: props.itemheight, 
              borderBottom: `2px dashed ${BaseStyle.global?.colors?.["accent-2"] + "42"}`, 
              strokeDasharray: 1000, 
              strokeDashoffset: 1000 
            }}
        >
          {hoverAnchor && (
            <>
              <div style={{ position: 'absolute', background: 'gray', opacity: '0.2', left: 0, top: 0, bottom: 0, right: 0}} />
              <DataTaskPlaceholder top={'30%'} left={hoverAnchor.x}/>
            </>
          )}
          {props.children}
        </Box>
      );
  }
  