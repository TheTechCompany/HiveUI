import React, { useEffect, useRef } from 'react';
import { select } from 'd3-selection'
import { drag } from 'd3-drag';
import { ResizeDragEvent, useGetPointerPosition } from 'reactflow';

export interface PathPointProps {
    cx?: number;
    cy?: number;
    style?: any;
    onUpdate?: (pos: any) => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
}

export const PathPoint = (props: PathPointProps) => {
    const getPointerPosition = useGetPointerPosition();

    const pointRef = useRef(null);

    useEffect(() => {
        if(!pointRef.current) return;

        console.log("setting up drag");

        const selection = select<SVGElement, unknown>(pointRef.current)

        console.log(selection)
  
        const dragHandler = drag<SVGElement, unknown>()
          .on('start', (event: ResizeDragEvent) => {
           const pos = getPointerPosition(event)
  
           
           console.log("START", {pos}, event.sourceEvent)
          })
          .on('drag', (event: ResizeDragEvent) => {
            const pos = getPointerPosition(event)
            props.onUpdate?.(pos);
           console.log({pos})
          })
          .on('end', (event: ResizeDragEvent) => {
            const pos = getPointerPosition(event)
            console.log({pos})
          });
  
        selection.call(dragHandler)
        // return () => {
        //   selection.on('.drag', null);
        // }
    }, [pointRef.current]);

    return (
        <g 
            ref={pointRef}
            className="line-point"
            onContextMenu={props.onContextMenu}
            style={{cursor: 'pointer', ...props.style}}>

            <circle
                cx={props.cx}
                cy={props.cy}
                r={5}
                fill="purple">

            </circle>
            <circle     
                style={{pointerEvents: 'none'}}
                cx={props.cx}
                cy={props.cy}
                r={2}
                fill="black">

            </circle>
        </g>
    )
}