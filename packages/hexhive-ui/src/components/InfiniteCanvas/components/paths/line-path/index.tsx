import { getHostForElement } from "@hexhive/utils";
import React, { useContext } from "react";
import { IInfiniteCanvasContext, InfiniteCanvasContext } from "../../../context/context";
import { AbstractPathFactory  } from "../../../factories/abstract-path-factory";
import { InfiniteCanvasPath, InfiniteCanvasPosition } from "../../../types";
import { PathPoint } from "./point";
import { FlowPathSegment } from "./segment";


export const LinePathFactory = (continuous: boolean = false) => {
    let factoryUpdate = {};

    if(continuous){
        factoryUpdate = {
            renderPath: (path: InfiniteCanvasPath, points: InfiniteCanvasPosition[], setPoints: (points: InfiniteCanvasPosition[]) => void, ix: number) => {
                return <FlowPathSegment points={points} />
            },
        }
    }
    return (context: IInfiniteCanvasContext) => {

        
        return {
            type: 'line',
            continuous,
            ...factoryUpdate,
            renderPathSegment: (path: InfiniteCanvasPath, points: InfiniteCanvasPosition[], setPoints: (points: InfiniteCanvasPosition[]) => void, ix: number) => {
                const { addPathPoint, selectPath } = useContext(InfiniteCanvasContext)
                return (
                    <FlowPathSegment
                        // onContextMenu={props.onContextMenu}
                        // arrow={ix == props.points.length}
                        onMouseDown={(e) => {
                            // (ix, e, position) => (e.metaKey || e.ctrlKey) ? addPoint(path.id, ix, e, position) : onSelect(path.id)
                            // context.segmentClick(ix, e)
                            if(e.metaKey || e.ctrlKey){
                                addPathPoint?.(path.id, ix, { x: e.clientX, y: e.clientY})
                            }else{
                                selectPath?.(path.id)
                            }
                        }} 
                        points={points} 
                        />
                )
            },
            renderPathPoint: (path: InfiniteCanvasPath, point: InfiniteCanvasPosition, setPoint: (points: InfiniteCanvasPosition) => void, ix: number) => {
                const { linkPath, getRelativeCanvasPos, updatePathPoint } = useContext(InfiniteCanvasContext);
                
                return (
                    <PathPoint 
                        cx={point.x}
                        cy={point.y}

                        onMouseDown={(e) => {
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
                    
                                setPoint({
                                    x: rp?.x || 0,
                                    y: rp?.y || 0
                                })
                                // let p = points.slice()
                                // p[ix] = {
                                //     x: rp?.x || 0,
                                //     y: rp?.y || 0
                                // }
                                // setPoints(p)
                                // updatePointPosition({x: e.clientX, y: e.clientY})
                            }
                    
                            const mouseUp = (e: MouseEvent) => {
                    
                                updatePathPoint?.(path.id, ix - 1, { x: e.clientX, y: e.clientY})

                                // props.onPointsChanged?.(ix, {x: e.clientX, y: e.clientY})
                    
                                let target = (e.target as HTMLElement)
                                if(target.hasAttribute('data-nodeid')){
                    
                                    let nodeId = target.getAttribute('data-nodeid') || ''
                                    let handleId = target.getAttribute('data-handleid') || ''
                    
                                    linkPath?.(path.id, nodeId, handleId)
                                    // props.onLinked?.(nodeId, handleId)
                    
                                }
                    
                                doc.removeEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
                                doc.removeEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
                            }
                    
                            doc.addEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
                            doc.addEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
                        }}
                            />
                )
            }
        }
    }
}
// export class LinePathFactory extends AbstractPathFactory {
//     constructor(){
//         super("line");
//     }


//     renderPathSegment(path: InfiniteCanvasPath, points: InfiniteCanvasPosition[], ix: number, context: IInfiniteCanvasContext): JSX.Element {
//         return (
//             <FlowPathSegment
//                 // onContextMenu={props.onContextMenu}
//                 // arrow={ix == props.points.length}
//                 onMouseDown={(e) => {
//                     // (ix, e, position) => (e.metaKey || e.ctrlKey) ? addPoint(path.id, ix, e, position) : onSelect(path.id)
//                     // context.segmentClick(ix, e)
//                     if(e.metaKey || e.ctrlKey){
//                         context.addPathPoint?.(path.id, ix, { x: e.clientX, y: e.clientY})
//                     }else{
//                         context.selectPath?.(path.id)
//                     }
//                 }} 
//                 points={points} 
//                 />
//         )
//     }

//     renderPathPoint(path: InfiniteCanvasPath, point: InfiniteCanvasPosition, ix: number): JSX.Element | null {
//         return (
//             <PathPoint 
//                 cx={point.x}
//                 cy={point.y}
                
//                 />
//         )
//     }
// }