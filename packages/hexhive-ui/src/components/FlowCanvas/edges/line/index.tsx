import React, { useEffect, useState } from "react"
import { EdgeProps, ResizeDragEvent, useGetPointerPosition, useStoreApi, updateEdge } from "reactflow"
import { FlowPathSegment } from "./segment"
import { drag } from 'd3-drag';
import { selectAll } from 'd3-selection';
import { PathPoint } from "./point";
export const LineEdge = (edge: EdgeProps) => {

  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data: {
      points = []
    },
    markerEnd,
  } = edge;
    const getPointerPosition = useGetPointerPosition();
    const store = useStoreApi();
    
    const [ memoryPoints, setPoints ] = useState<any[]>(points || []);

    const fullPoints = [{x: sourceX, y: sourceY}, ...memoryPoints, {x: targetX, y: targetY}]

    const { transform, snapGrid, snapToGrid } = store.getState();
   

    // useEffect(() => {
    //   const selection = selectAll<HTMLDivElement, unknown>('.path-point')

    //   console.log(selection)

    //   const dragHandler = drag<HTMLDivElement, unknown>()
    //     .on('start', (event: ResizeDragEvent) => {
    //      const pos = getPointerPosition(event)

         
    //      console.log({pos}, event.sourceEvent)
    //     })
    //     .on('drag', (event: ResizeDragEvent) => {
    //       const pos = getPointerPosition(event)
    //      console.log({pos})
    //     })
    //     .on('end', (event: ResizeDragEvent) => {
    //       const pos = getPointerPosition(event)
    //       console.log({pos})
    //     });

    //   selection.call(dragHandler)
    //   return () => {
    //     selection.on('.drag', null);
    //   }
    // }, [fullPoints]);


    return <>
        <FlowPathSegment
          onMouseDown={(e) => {

            if(e.metaKey){
              // updateEdge(edge, {
              //   ...edge, 
              //   data: {}
              // }, []);
            setPoints((point) => {
              let p = (point || []).slice();

              const x = e.clientX;
              const y = e.clientY;
          
              const pointerPos = {
                x: (x - transform[0]) / transform[2],
                y: (y - transform[1]) / transform[2],
              };
              p.push(pointerPos)

              return p;
            })
          }
          


          }}
            points={fullPoints}
            />
            {memoryPoints.map((point, ix) => <PathPoint key={point.id} onUpdate={(pos) => {
              console.log(pos)
              setPoints((p) => {
                let points = p.slice();
                points[ix].x = pos.xSnapped;
                points[ix].y = pos.ySnapped;
                return points;
              })
            }} cx={point.x} cy={point.y} />)}
    </>
  }