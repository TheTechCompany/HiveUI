import styled from 'styled-components'
import { throttle } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { InfiniteCanvasPath, InfiniteCanvasPosition } from '../../types/canvas';
import { createLine, getHostForElement } from '../../utils';
import { PathPoint } from './point';
import { FlowPathSegment } from './segment';
import { InfiniteCanvasContext } from '../../context/context';
import { style } from '@mui/system';

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

    useEffect(() => {
        setPoints(props.points)
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

    return props.editable ? (
        <g className={`${props.className} ${props.selected ? 'selected': ''}`}>
        
        {generateLine(points, (points, ix) => (
            <FlowPathSegment 
                onContextMenu={props.onContextMenu}
                arrow={ix == props.points.length}
                onMouseDown={(e) => segmentClick(ix, e)} points={points} />
        ))}
        {generateHandles(points, (location, ix) => (
            <PathPoint 
                onContextMenu={props.onContextMenu}
                onMouseDown={(e) => dragPathPoint(e, ix)}
                style={{cursor: 'pointer'}}
                cx={location.x} 
                cy={location.y} />
        ))}
          <defs>
            <marker id='head' orient='auto' markerWidth='16' markerHeight='32'
                    refX='12' refY='5'>
                <path d='M 0 0 L 10 5 L 0 10 z' fill={style?.pathColor || 'gray'} />
            </marker>
        </defs>  
        </g>) : (
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