import styled from 'styled-components'
import { throttle } from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { InfiniteCanvasPath, InfiniteCanvasPosition } from '../../types/canvas';
import { createLine, getHostForElement } from '../../utils';
import { PathPoint } from './point';
import { FlowPathSegment } from './segment';
import { InfiniteCanvasContext } from '../../context/context';
import { style } from '@mui/system';
import { PathBend } from './bend';
import Elbow from './Elbow';

// import ElbowBend from './elbow.svg';

export interface FlowPathProps {
    className?: string;
    selected?: boolean;
    points: InfiniteCanvasPosition[]
    editable?: boolean;
    path?: InfiniteCanvasPath;
    onLinked?: (nodeId: string, handleId: string) => void;
    onPointsChanged?: (ix: number, position: InfiniteCanvasPosition) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    onMouseDown?: (ix: number, e: React.MouseEvent, position: InfiniteCanvasPosition) => void;
}

export const BaseFlowPath : React.FC<FlowPathProps> = (props) => {
    
    const [ points, setPoints ] = useState(props.points)

    const { getRelativeCanvasPos, style } = useContext(InfiniteCanvasContext)

    const find_angle = (A: {x: number, y:number},B: {x: number, y:number},C: {x: number, y:number}) => {
        var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
        var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
        var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
        return ( Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB)) * 180 ) / Math.PI;    
    }

    useEffect(() => {
        setPoints(props.points)
    }, [props.points])
    
    const angles = useMemo(() => {
        let init : InfiniteCanvasPosition[][] = [];
        let pairs = points.reduce((result, value, index, array) => {
            if(index < array.length - 1){
                result.push(array.slice(index, index+ 2))
            }
            return result;
        }, init)


        let angles = pairs.map((pair, ix) => {
            let nextPair = pairs[ix + 1];
            if(nextPair){
                let dx1 = pair[0].x - pair[1].x;
                let dy1 = pair[0].y - pair[1].y;

                let dx2 = nextPair[1].x - pair[1].x;
                let dy2 = nextPair[1].y - pair[1].y;

                let a1 = Math.atan2(dy1, dx1)
                let a2 = Math.atan2(dy2, dx2)

                return find_angle(pair[0], pair[1], nextPair[1])
                return (ix % 2 == 0 ? a1 : a2) * 180 / Math.PI;
                // console.log({a1: (a1 *180) / Math.PI, a2: (a2 * 180) / Math.PI})
            }
        }).filter((a) => a);
        
        for(var i = 0; i < angles.length; i++){
            let previous = angles[i - 1]
            if(previous){
                angles[i] = ((angles[i] || 0) + previous)
            }
        }
      

        // console.log({pairs, angles});
        return angles;
    }, [props.points])

    const generateLine = (points: InfiniteCanvasPosition[], path_render: (points: InfiniteCanvasPosition[], ix: number) => JSX.Element) => {
        let init : InfiniteCanvasPosition[][] = [];
        let pairs = points.reduce((result, value, index, array) => {
            if(index < array.length - 1){
                result.push(array.slice(index, index+ 2))
            }
            return result;
        }, init)

       

        return pairs.map((pair, ix) => path_render(pair, ix))

    }

    const segmentClick = (ix: number, e: React.MouseEvent) => {
        props.onMouseDown?.(ix, e, {
            x: e.clientX,
            y: e.clientY
        })
    }


    const generateHandles = (points: InfiniteCanvasPosition[], render: (point: InfiniteCanvasPosition, ix: number) => JSX.Element) => {
        let p = points.slice(0, props.path?.targetHandle ? points.length - 1 : points.length)
        let handles = p.map((point, ix) =>  ix != 0 && render(point, ix))
        return  handles;
    }

    const dragPathPoint = (e: React.MouseEvent, ix: number) => {
        let pos : InfiniteCanvasPosition = {
            x: e.clientX,
            y: e.clientY
        }

        e.preventDefault()
        e.stopPropagation()

        // props.onPointsChanged?.(ix, pos)

        let doc = getHostForElement(e.target as HTMLElement)


        let rp = getRelativeCanvasPos?.(pos);// (canvasRef, {offset: _offset, zoom: _zoom}, point)
        // rp = lockToGrid(rp, snapToGrid, grid)

        // let current_path = _paths.current.find((a) => a.id == id)

        // if(!current_path) return;
        
        // let updated = updatePathSegment(Object.assign({}, current_path), ix, rp);

        const mouseMove = (e: MouseEvent) => {
            let rp = getRelativeCanvasPos?.({x: e.clientX, y: e.clientY})

            let p = points.slice()
            p[ix] = {
                x: rp?.x || 0,
                y: rp?.y || 0
            }
            setPoints(p)
            // updatePointPosition({x: e.clientX, y: e.clientY})
        }

        const mouseUp = (e: MouseEvent) => {

            props.onPointsChanged?.(ix, {x: e.clientX, y: e.clientY})

            let target = (e.target as HTMLElement)
            if(target.hasAttribute('data-nodeid')){

                let nodeId = target.getAttribute('data-nodeid') || ''
                let handleId = target.getAttribute('data-handleid') || ''

                props.onLinked?.(nodeId, handleId)

            }

            doc.removeEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
            doc.removeEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
        }

        doc.addEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
        doc.addEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
    }

    /*
// <PathPoint 
            //     onContextMenu={props.onContextMenu}
            //     onMouseDown={(e) => dragPathPoint(e, ix)}
            //     style={{cursor: 'pointer'}}
            //     cx={location.x} 
            //     cy={location.y} />
    */



    return props.editable ? (
        <>
        {generateLine(points, (point, ix) => (
            <FlowPathSegment 
                onContextMenu={props.onContextMenu}
                arrow={ix == props.points.length}
                nextPoint={points[ix + 2]}
                onMouseDown={(e) => segmentClick(ix, e)} 
                points={point} />
        ))}
        {generateHandles(points, (location, ix) => {
        
            const startPoint = points[ix - 1]
            const endPoint = points[ix + 1]
            const handle = points[ix]

            const lastStartPoint = points[ix - 2];
            const lastEndPoint = points[ix]
            const lastHandle = points[ix - 1]

            let angle = 0;
            let lastAngle = 0;
            
            if(lastEndPoint && lastStartPoint){
                let dx1 = lastStartPoint.x - lastHandle.x;
                let dy1 = lastStartPoint.y - lastHandle.y;

                let dx2 = lastEndPoint.x - lastHandle.x;
                let dy2 = lastEndPoint.y - lastHandle.y;

                let a1 = Math.atan2(dy1, dx1) 
                let a2 = Math.atan2(dy2, dx2) 

                lastAngle = -find_angle(lastStartPoint, lastHandle, lastEndPoint) // ((a1 - a2) * 180) / Math.PI;
            }
            
            if(endPoint){

                const dx1 = startPoint.x - handle.x;
                const dy1 = startPoint.y - handle.y;
                const dx2 = endPoint.x - handle.x;
                const dy2 = endPoint.y - handle.y;

                let a1 = Math.atan2(dy1, dx1)
                let a2 = Math.atan2(dy2, dx2)

                angle =  -find_angle(startPoint, handle, endPoint) //((a1 - a2) * 180) / Math.PI //(((ix % 2 == 0 ? a1 : a2) * 180 / Math.PI) + 360) %360;

            }
            console.log({ix, angle, lastAngle, last: lastAngle + angle})

            angle = -(angles[ix -1 ] || 0) //angle + lastAngle;

            console.log({angles, ix, angle, location})
            
      

            const offsetX = 7.5
            const offsetY = 7.5

            let x = location.x - 50 + offsetX;
            let y = location.y - offsetY

            const transformX = x + 50 - offsetX;
            const transformY = y + offsetY

            return (ix - 1) <  angles.length ? (<Elbow 
                    width={50}
                    height={50}
                    x={x}
                    y={y}
                    onMouseDown={(e) => {
                        dragPathPoint(e, ix)
                    }}
                    style={{
                        position: 'absolute',
                        // left: location.x,
                        // top: location.y,
                        width: '50px',
                        height: '50px',
                        transformBox: 'fill-box', 
                        transformOrigin: `${transformX}px ${transformY}px`, 
                        transform: `rotate(${angle + 90}deg) `
                    }}
                    // transform={`rotate(${angle} ${location.x + 25} ${location.y + 25})`}
                    // style={{transformBox: 'fill-box', transformOrigin: 'center', transform: `rotate(-90deg)`}}
                    // x={location.x || angle >= 270 ? location.x : location.x - 50}
                    // y={location.y || (angle <= -90 || angle >= 270) ? location.y  : location.y - 50}
                    />
                ): (
                <PathPoint
                    onMouseDown={(e) => {
                        dragPathPoint(e, ix)
                    }}
                    cx={location.x}
                    cy={location.y} />
            )
        })}
          <defs>
            <marker id='head' orient='auto' markerWidth='16' markerHeight='32'
                    refX='12' refY='5'>
                <path d='M 0 0 L 10 5 L 0 10 z' fill={style?.pathColor || 'gray'} />
            </marker>
        </defs>  
        </>) : (
            <g className={`${props.className} ${props.selected ? 'selected': ''}`}>
            <FlowPathSegment 
                arrow={true}
                onContextMenu={props.onContextMenu}
                onMouseDown={(e) => segmentClick(0, e)} points={points} />
                </g>
    )    
}

export const FlowPath = styled(BaseFlowPath)`
    &:hover .flow-path__highlight{
        stroke-opacity: 0.4;
    }

    &.selected .flow-path__highlight{
        stroke-opacity: 0.5;
    }
`