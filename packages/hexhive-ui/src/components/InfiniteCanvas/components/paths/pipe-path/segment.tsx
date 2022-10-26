import React, { useContext, useMemo } from 'react';

import styled from 'styled-components'
import { InfiniteCanvasContext } from '../../../context/context';
import { InfiniteCanvasPosition } from '../../../types/canvas';
import { createLine } from '../../../utils';

export interface FlowPathSegmentProps {
    d?: string;
    className?: string;
    points?: InfiniteCanvasPosition[],
    onMouseDown?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    arrow?: boolean;
    nextPoint?: any;
}

export const BaseFlowPathSegment : React.FC<FlowPathSegmentProps> = (props) => {
    const d = useMemo(() => {
        if(props.d) return props.d;
        if(props.points) return createLine(props.points)
    }, [props.d, props.points])

    const { style } = useContext(InfiniteCanvasContext)

    const x = ((props.points?.[0]?.x || 0) > (props.points?.[1]?.x || 0) )? props.points?.[1]?.x : props.points?.[0]?.x;
    const y = ((props.points?.[0]?.x || 0) > (props.points?.[1]?.x || 0) ) ? props.points?.[1]?.y : props.points?.[0]?.y;

    const rightX = ((props.points?.[0]?.x || 0) < (props.points?.[1]?.x || 0) || (props.points?.[0]?.x || 0) == (props.points?.[1]?.x || 0))? props.points?.[1]?.x : props.points?.[0]?.x;
    const rightY = ((props.points?.[0]?.x || 0) < (props.points?.[1]?.x || 0) || (props.points?.[0]?.x || 0) == (props.points?.[1]?.x || 0)) ? props.points?.[1]?.y : props.points?.[0]?.y;

    const width = Math.abs((props.points?.[0]?.x || 0) - (props.points?.[1]?.x || 0))
    const height = Math.abs((props.points?.[0]?.y || 0) - (props.points?.[1]?.y || 0))

    const hypo = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))

  
    let rotation = ((((Math.atan2((rightY || 0) - (y || 0), (rightX || 0) - (x || 0)) * 180 )/ Math.PI) ) + 360) % 360

    // if (!(rotation > 0)){
    //     rotation = (2 * Math.PI + rotation) * 360 /(2 * Math.PI)
    // }

    // if(rotation < 0){
    //     rotation = rotation * 2 * Math.PI
    // }
    // if(rotation > 90) 

    const find_angle = (A: {x: number, y:number},B: {x: number, y:number},C: {x: number, y:number}) => {
        var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
        var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
        var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
        return ( Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB)) * 180 ) / Math.PI;    
    }


    rotation = rotation % 360;
    if(rotation < 0){
        rotation += 360;
    }
    // const rotation = find_angle()

    return (
        <g 
            onContextMenu={props.onContextMenu}
            className={props.className}
             onMouseDown={props.onMouseDown}>

            
            {/* {props.nextPoint && (
                <path d={`M${props.points?.[1]?.x || 0}, ${props.points?.[1]?.y || 0} Q${props.points?.[1]?.x || 0}, ${props.points?.[1]?.y || 0} ${props.nextPoint?.x}, ${props.nextPoint?.y}`}  stroke={'black'} strokeWidth={8}/>
            )} */}
            {/* <Join
            x={(props.points?.[1]?.x || 0) }
            y={(props.points?.[1]?.y || 0) - (12.5)}
            style={{
                transformBox: 'fill-box',
                transformOrigin: `${((props.points?.[1]?.x || 0)) + 5}px ${((props.points?.[1]?.y || 0)) + 12.5}px`,
                transform: `rotate(${rotation}deg)`
            }}
                height="25"
                width="10"
                /> */}
            <rect 
                fill={`url(#skeuamorphic)`}
                style={{
                    transformOrigin: `6.5px 6.5px`, 
                    transformBox: 'fill-box', 
                    transform: `translateX(-6.5px) translateY(-6.5px) rotate(${rotation}deg) scaleY(${false ? '-1' : '1'})`
                }}
                x={(x || 0)} y={(y || 0)} 
                width={hypo + 13} height={13} />
            {/* <Join 
                x={(props.points?.[0]?.x || 0) - 10}
                y={(props.points?.[0]?.y || 0) - ( 12)}
                style={{
                    transformBox: 'fill-box',
                    transformOrigin: `${(props.points?.[0]?.x || 0) + 5}px ${(props.points?.[0]?.y || 0) + 12.5}px`,
                    transform: `rotate(${rotation}deg)`
                }}
                 height="25"
                width="10"/> */}
            {/* <div
                style={{
                    position: 'absolute',
                    left: props.points?.[0]?.x,
                    top: props.points?.[0]?.y,
                }}
                >asdf</div> */}
            {/* <path d={d} className={"flow-path__pipe-border"}  /> */}
             {/* <path d={d} style={{stroke: `url(#curvedPipe)`, /*style?.pathColor }} className={"flow-path__pipe"}  />
            <path d={d} style={{stroke: style?.pathColor,}} className={"flow-path"} {...{"marker-end": "url(#head)"}} />

            <path d={d} className={"flow-path__highlight"} />  */}
          
        </g>
    )
}
export const PipeSegment = styled(BaseFlowPathSegment)`

    cursor: pointer;

    .flow-path{
        stroke: blue;
        stroke-opacity: 0;
        stroke-linecap: round;
        stroke-linejoin: round;
        // fill: none;
        stroke-width: 2px;
    }

    .flow-path__pipe, .flow-path__pipe-border{
        fill: none;
        stroke-linejoin: round;
        stroke-width: 4px;
        stroke-opacity: 0.6;
        stroke-border: 1px solid black;
        stroke: #dfdfdf;
    }

    .flow-path__pipe-border{
        stroke-width: 6px;
        stroke: black;
    }

    .flow-path__highlight {
        fill: none;
        stroke-linejoin: round;
        stroke-width: 8px;
        stroke-opacity: 0;
        stroke: cyan;
    }

    @keyframes marching {
        to{
            stroke-dashoffset: 0;
        }
    }

    
    &.active .flow-path__highlight {
        stroke-opacity: 0;
    }

    &.active .flow-path{
        stroke: #F99C1C;
        stroke-opacity: 1;
        stroke-dasharray: 4px;
        stroke-dashoffset: 8px;
        animation: marching 1s linear infinite;
    }
`
