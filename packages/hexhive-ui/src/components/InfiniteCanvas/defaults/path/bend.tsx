   // <PathPoint 
            //     onContextMenu={props.onContextMenu}
            //     onMouseDown={(e) => dragPathPoint(e, ix)}
            //     style={{cursor: 'pointer'}}
            //     cx={location.x} 
            //     cy={location.y} />

import React from 'react'
import { PathPoint } from './point'

export const PathBend = (props: any) => {

    const {x, y, start, bend, end} = props

    if(!start || !bend || !end) return null;

    const dx = (bend.x - start.x) * 0.8
    const dy = (bend.y - start.y) * 0.8

    const dx1 = (bend.x - end.x)  * 0.8
    const dy1 = (bend.y - end.y) * 0.8

    return (
        <g 
            x={props.x}
            y={props.y}>
        <PathPoint
            onMouseDown={props.onMouseDown}
         />
        <path
            onMouseDown={props.onMouseDown}
            d={`M${props.start.x + dx},${props.start.y + dy} Q${props.bend.x },${props.bend.y} ${props.end.x + dx1},${props.end.y + dy1}`}
            style={{
                fill: 'none',
                stroke: 'yellow',
                strokeWidth: '4px'
            }}    
        />
        </g>
    )
}