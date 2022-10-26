import React, { useContext, useEffect, useMemo, useState } from 'react';
import {  getHostForElement } from '../utils';
import { IInfiniteCanvasContext, InfiniteCanvasContext } from '../context/context';
import { InfiniteCanvasPath, InfiniteCanvasPosition } from '../types/canvas';
import { FlowPath } from '../defaults/path';
import { AbstractPathFactory, IAbstractPathFactory } from '../factories/abstract-path-factory';

export interface PathLayerProps {
}


export const PathLayer : React.FC<PathLayerProps> = (props) => {
    const { 
        zoom, 
        offset, 
        nodes,
        paths:_paths,
        ports,
        router,
        updatePathPoint, 
        linkPath, 
        selectPath,
        addPathPoint,
        openContextMenu,
        selected,
        editable,
        style,
        factories,
        engine
    } = useContext(InfiniteCanvasContext)

    const context = useContext(InfiniteCanvasContext)

    // const [ paths, setPaths ] = useState<InfiniteCanvasPath[]>([])
    
    const find_angle = (A: {x: number, y:number},B: {x: number, y:number},C: {x: number, y:number}) => {
        var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
        var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
        var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
        return ( Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB)) * 180 ) / Math.PI;    
    }

    const paths = useMemo(() => {
        if(_paths && nodes && ports){

            console.log({_paths})


                // console.log({pairs, angles});
            
            let p = _paths.map((x) : InfiniteCanvasPath => {
                let points: any[] = [];
            
               
                if(router){

                    if(x.sourceHandle && x.targetHandle){

                        let startNode = nodes?.find((a) => a.id == x.source)
                        
                        let startX, startY;
                        
                        if(typeof(x.sourceHandle) == 'string'){
                            let startPort = ports?.[`${x.source}:${x.sourceHandle}`]

                            startX = startPort?.relativeX;
                            startY = startPort?.relativeY;
                        }else{
                            startX = x.sourceHandle?.x;
                            startY = x.sourceHandle?.y;
                        }

                        let targetNode = nodes?.find((a) => a.id == x.target)

                        let endX, endY;
                        if(typeof(x.targetHandle) == 'string'){
                            let targetPort = ports?.[`${x.target}:${x.targetHandle}`]
                            endX = targetPort?.relativeX;
                            endY = targetPort?.relativeY;
                        }else{
                            endX = x.targetHandle?.x;
                            endY = x.targetHandle?.y;
                        }

                        points = (engine?.generatePath?.({
                            x: (startNode?.x || 0) + (startX || 0),// + ((startPort.width || 0) / 2),
                            y: (startNode?.y || 0) + (startY || 0)// + ((startPort.height || 0) / 2)
                        }, {
                            x: (targetNode?.x || 0) + (endX || 0), // + ((targetPort.width || 0) / 2),
                            y: (targetNode?.y || 0) + (endY || 0) //+ ((targetPort.height || 0) / 2)
                        }) || [])

                    }else if(x.sourceHandle && x.source && x.points){

                        let startNode = nodes?.find((a) => a.id == x.source)

                         
                        let startX, startY;
                        
                        if(typeof(x.sourceHandle) == 'string'){
                            let startPort = ports?.[`${x.source}:${x.sourceHandle}`]

                            startX = startPort?.relativeX;
                            startY = startPort?.relativeY;
                        }else{
                            startX = x.sourceHandle?.x;
                            startY = x.sourceHandle?.y;
                        }

                        if(!startX || !startY || !startNode) {
                            points = []
                        } ///return {id: '', points :[]};
                        else {
                            if(!x.points[x.points.length - 1]) {
                                points = []
                            }
                            else{
                                points = (engine?.generatePath?.({
                                    x: (startNode?.x || 0) + (startX || 0),// + ((startPort.width || 0) / 2),
                                    y: (startNode?.y || 0) + (startY || 0) //+ ((startPort.height || 0) / 2)
                                }, {
                                    x: (x.points[x.points.length - 1].x),
                                    y: (x.points[x.points.length - 1].y)
                                }) || [])

                             
                            }
                        }
                    }else{
                        points = (engine?.generatePath?.({
                            x: x.points?.[0]?.x,
                            y: x.points?.[0]?.y
                        }, {
                            x: x.points?.[x.points.length - 1]?.x,
                            y: x.points?.[x.points.length - 1]?.y
                        }) || [])
                    }

                }else{

                    points = x.points;

                    console.log({x})

                    if(x.sourceHandle){
                        let node = nodes?.find((a) => a.id == x.source)
                        // let port = ports?.[`${x.source}:${x.sourceHandle}`]

                        // console.log({node});

                        let startX, startY; 
                        
                        if(typeof(x.sourceHandle) == 'string'){
                            let startPort = ports?.[`${x.source}:${x.sourceHandle}`]

                            startX = startPort?.relativeX + (startPort?.width / 2);
                            startY = startPort?.relativeY + (startPort?.height / 2);

                            if(x.id == '4') console.log("Start Port", {x, startX, startY})
                        }else{
                            startX = x.sourceHandle?.x;
                            startY = x.sourceHandle?.y;

                            if(x.id == '4') console.log({x, startX, startY})

                        }


                        if(startX != undefined && startY != undefined && node){

                            
                            let point = {
                                x: (node?.x || 0) + (startX || 0),// + ((port.width || 0) / 2),
                                y: (node?.y || 0) + (startY || 0) //+ ((port.height || 0) /2)
                            }
                            points = [point, ...(points || [])]
                        }
                    }

                    if(x.targetHandle){
                        let node = nodes?.find((a) => a.id == x.target)
                        // let port = ports?.[`${x.target}:${x.targetHandle}`]

                        let endX, endY;
                        if(typeof(x.targetHandle) == 'string'){
                            let targetPort = ports?.[`${x.target}:${x.targetHandle}`]

                            endX = targetPort?.relativeX + (targetPort?.width / 2);
                            endY = targetPort?.relativeY + (targetPort?.height / 2);

                            if(x.id == '4') console.log("End Port", {x, endX, endY})

                        }else{
                            endX = x.targetHandle?.x;
                            endY = x.targetHandle?.y;
                        }

                        // console.log({endX, endY, node});

                        if(endX != undefined && endY != undefined && node){
                            let point = {
                                x: (node?.x || 0) + (endX || 0), //+ ((port.width || 0) / 2),
                                y: (node?.y || 0) + (endY || 0) //+ ((port.height || 0) /2)
                            }
                            points = [...(points || []), point]
                        }
                    }
                    console.log({x, points})

                }

                // findPath?.()

                let init : InfiniteCanvasPosition[][] = [];
                let pairs = points.reduce((result, value, index, array) => {
                    if(index < array.length - 1){
                        result.push(array.slice(index, index + 2))
                    }
                    return result;
                }, init)
        
        
                let angles = pairs.map((pair: any, ix: number) => {
                    let nextPair = pairs[ix + 1];
                    if(nextPair){
                        let dx1 = pair[0].x - pair[1].x;
                        let dy1 = pair[0].y - pair[1].y;
        
                        let dx2 = nextPair[1].x - pair[1].x;
                        let dy2 = nextPair[1].y - pair[1].y;
        
                        let a1 = Math.atan2(dy1, dx1) * 180 / Math.PI
                        let a2 = Math.atan2(dy2, dx2) * 180 / Math.PI

        
                        return find_angle(pair[0], pair[1], nextPair[1])
                    }
                }).filter((a: any) => a);
                
                // for(var i = 0; i < angles.length; i++){
                //     let previous = angles[i - 1]
                //     if(previous){
                //         angles[i] = ((angles[i] || 0) - previous)
                //     }
                // }
              
    
                return {
                    ...x,
                    points: (points || []).map((point, ix) => ({...point, angle: angles[ix - 1]})),
                    id: x.id,
                    
                }
            })

            // setPaths(p)
            return p
        }
        return []
    }, [_paths, nodes, offset, zoom, ports])


   

    const addPoint = (path_id: string, ix: number, e: React.MouseEvent, pos: InfiniteCanvasPosition) => {
        addPathPoint?.(path_id, ix, pos)
        e.stopPropagation()

        let doc = getHostForElement(e.target as HTMLElement)

        const mouseMove = (e: MouseEvent) => {
            updatePoint(path_id, ix + 1, {
                x: e.clientX,
                y: e.clientY
            })
        }

        const mouseUp = (e: MouseEvent) => {    
            doc.removeEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
            doc.removeEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
        }

        doc.addEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
        doc.addEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
    }

    const updatePoint = (path_id: string, ix: number, pos: InfiniteCanvasPosition) => {
        updatePathPoint?.(path_id, ix - 1, pos)
    }


    const onSelect = (path_id: string) => {
        selectPath?.(path_id)
    }


    const generateHandles = (
        path: InfiniteCanvasPath,
        setPoints: (points: InfiniteCanvasPosition[]) => void,
        factory: IAbstractPathFactory
    ) => {  
        const { points, targetHandle } = path;

        let p = points.slice(0, targetHandle ? points.length - 1 : points.length)
        const setPoint = (ix: number, position: InfiniteCanvasPosition) => {
            let newPoints = points.slice();
            newPoints[ix] = position;
            setPoints(newPoints);
        }

        let handles = p.map((point, ix) =>  ix != 0 ? factory.renderPathPoint?.(path, point, (position: InfiniteCanvasPosition) => setPoint(ix, position), ix) : <></>)
        return  handles;
    }


    const generateLine = (
         path: InfiniteCanvasPath,
         setPoints: (points: InfiniteCanvasPosition[]) => void,
         factory: IAbstractPathFactory
    ) => {
        const { points } = path;

        let init : InfiniteCanvasPosition[][] = [];
        let pairs = points.reduce((result, value, index, array) => {
            if(index < array.length - 1){
                result.push(array.slice(index, index+ 2))
            }
            return result;
        }, init)

        return pairs.map((pair, ix) => factory.renderPathSegment(path, pair, setPoints, ix))
    }


    const renderFactory = (path: InfiniteCanvasPath) => {;
        if(!path.type) path.type = 'default';
        let factory = factories?.[path.type]

        if(!factory){
            console.error(`No factory for path type ${path.type}`)
            // return;
        }



        if(factory){

            return () => {
                const [points, setPoints] = useState(path.points || [])

                path.points = points;
                // let props = {
                //     path,
                //     onSelect,
                //     addPoint,
                //     updatePoint,
                //     onDelete: (e) => {
                //         deletePath?.(path.id)
                //         e.stopPropagation()
                //     }
                // }
                return <>
                    {generateLine(path, setPoints, factory as any)}
                    {generateHandles(path, setPoints, factory as any)}
                </>
            }
        }else{
            return null;
        }
    }

    const path_components = useMemo(() => {
        return paths.map((path) => renderFactory(path))
    }, [paths])

    return (
        <svg
            style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'all',
                transformOrigin: '0 0',
                transform: `matrix(${zoom}, 0, 0, ${zoom}, ${offset.x}, ${offset.y})`,
                position: 'absolute'
            }}>
                <defs>
       
                    <linearGradient id="skeuamorphic"  gradientTransform="rotate(90)">
                        <stop offset="0" stop-color="#6f7173"/>
                        <stop offset="0.5" stop-color="#d3d5d6"/>
                        <stop offset="1" stop-color="#6f7173"/>
                    </linearGradient>
                </defs>
                {paths.map((path) => renderFactory(path)).map((C) => C ?  <C /> : null)}
                {/* {paths?.map((path) => renderFactory(path)?.())} */}
                
        </svg>
    )
}

//                            className={getStatus(path.id) ? "active" : 'inactive'} 

/*
(
                    <>
                
                    <FlowPath
                    onContextMenu={(e) => openContextMenu?.({x: e.clientX, y: e.clientY}, {type: "path", id: path.id})}
                    selected={selected?.find((a) => a.key == 'path' && a.id == path.id) != null}
                    path={path}
                    editable={editable}
                    onLinked={(nodeId, handleId) => linkPath?.(path.id, nodeId, handleId)}
                    onPointsChanged={(ix, point) => {
                        updatePoint(path.id, ix, point)
                        console.log("UPDATED POINT", {ix, point})
                    }}
                    onMouseDown={(ix, e, position) => (e.metaKey || e.ctrlKey) ? addPoint(path.id, ix, e, position) : onSelect(path.id)}
                    points={(path.points || [])} />
            </>
        )
        )}
*/

    /* {context.selected?.type == 'path' && context.selected.id == path.id && path.menu && (
                        <Box 
                            onMouseDown={(e) => e.stopPropagation()}
                            flex
                            round="xsmall"
                            className="menu-dialog" 
                            style={{position: 'absolute', left: '100%', minHeight: 50}} background="light-1">
                            <Box
                                gap="xsmall"
                                pad="xsmall">
                                {path.menu}
                            </Box>
                        </Box>
                    )} */