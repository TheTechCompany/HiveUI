import { off } from 'process';
import React, { createRef,  useCallback,  useEffect, useMemo, useReducer, useRef, useState } from 'react';
import styled from 'styled-components'
import { isBuffer, isEqual, throttle, update, xor } from 'lodash'
import { PortWidget } from './components/ports'
import { getHostForElement } from './utils';
import { IInfiniteCanvasContext, InfiniteCanvasContext } from './context/context';
import { GridLayer } from './layers/grid';
import { NodeLayer } from './layers/nodes';
import { PathLayer } from './layers/paths';
import { ZoomControls } from './components/zoom-controls'

import { RetractingPort } from './components/ports/retracting'
import { BlockTray } from './components/block-tray'

import { nanoid } from 'nanoid';
import { AbstractNodeFactory, IAbstractNodeFactory } from './factories/abstract-node-factory';

import { reducer } from './store';
import * as actions from './store/actions'
import { addPathSegment, getRelativeCanvasPos, linkPath, lockToGrid, moveNode, onDrag, onTouchDrag, updatePathSegment } from './utils/canvas';
import { InfiniteCanvasNode, InfiniteCanvasPath, InfiniteCanvasPosition, InfinitePort } from './types/canvas';
import { HMIPosition } from './assets/hmi-spec';
import { ContextMenu } from './components/context-menu';

import * as PF from 'pathfinding';

import { InformationLayer } from './layers/information';
import { useEngine } from './hooks';
import { AbstractPathFactory, IAbstractPathFactory } from './factories/abstract-path-factory';

export * from './types'

export * from './components/nodes'
export * from './components/paths'

export {
    IAbstractNodeFactory,
    IAbstractPathFactory,
    AbstractNodeFactory,
    AbstractPathFactory,
    ZoomControls,
    RetractingPort,
    BlockTray,
    PortWidget
}
export interface Block {
    icon?: any;
    label?: string;
    blockType?: string;
    content?: any;
    extras?: any;
}


export interface InfiniteCanvasProps {

    finite?: boolean;

    style?: {
        background: string,
        pathColor?: string,
        dotColor?: string,
        lineColor?: string,
        portColor?: string,
        portDotColor?: string
    };

    router?: 'JumpPointFinder' 
    routerOptions?: {
        heuristic?: 'manhattan' | 'euclidean' | 'chebyshev',
        allowDiagonal?: boolean
    }

    className?: string;

    editable?: boolean;

    onDelete?: () => void;

    nodes?: InfiniteCanvasNode[],
    paths?: InfiniteCanvasPath[],

    onNodeCreate?: (position: InfiniteCanvasPosition, data: any) => void;
    onNodeUpdate?: (node: InfiniteCanvasNode) => void;

    onPathCreate?: (path: InfiniteCanvasPath) => void;
    onPathUpdate?: (path: InfiniteCanvasPath) => void;
    
    onBackdropClick?: () => void;

    assets?: {
        [key: string]: JSX.Element
    }
    
    factories?: Array<AbstractNodeFactory | AbstractPathFactory>;

    snapToGrid?: boolean;
    grid?: {width: number, height: number, divisions: number}

    offset?: {
        x: number
        y: number
    }

    menu?: any;
    information?: any;

    contextMenu?: {
        label?: any;
        icon?: any;
        onClick?: (type: "node" | "path", id: string) => void;
    }[]

    zoom?: number;

    selected?: {key: "node" | "path", id: string}[],
    onSelect?: (key: "node" | "path", id: string) => void

    onRightClick?: (target: any, position: {x: number, y: number}) => void;

    onViewportChanged?: (viewport: {zoom: number, offset: {x: number, y: number}}) => void;
}


// const pathFinderInstance =  PF.JumpPointFinder({
// 	heuristic: PF.Heuristic.manhattan,
// 	diagonalMovement: PF.DiagonalMovement.Never
// });

const ROUTING_SCALING_FACTOR = 5;

const initialState : any = {nodes: [], paths: []};

export const BaseInfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
    zoom,
    finite = false,
    router,
    routerOptions,
    style,
    onViewportChanged,
    offset,
    assets,
    factories,
    onNodeUpdate,
    onSelect,
    selected,
    onPathCreate,
    onPathUpdate,
    nodes,
    paths,
    onNodeCreate,
    editable,
    className,
    snapToGrid = false,
    grid = {width: 100, height: 100, divisions: 3},
    children,
    onDelete,
    onRightClick,
    contextMenu,
    menu,
    information,
    onBackdropClick
}) => {

    
  
    const [ ports, _setPorts ] = useState<{[key: string]: {
        relativeX: number;
        relativeY: number;
        x: number;
        y: number;
        width: number;
        height: number;
    } }>({})

    const portRef = useRef<{[key: string]: {
        relativeX: number;
        relativeY: number;
        x: number;
        y: number;
        width: number;
        height: number;
    } }>({})

    const setPorts = (ports: any) => {
        portRef.current = ports;
        _setPorts(ports)
    }
    const isDragging = useRef<{dragging: boolean}>({dragging: false});

    const [ menuPos, setMenuPos ] = useState<{x?: number, y?: number}>()

    const canvasRef = useRef<HTMLDivElement>(null)

    const [{
        zoom: _zoom,
        offset: _offset,
        nodeRefs,
        nodes: _nodes,
        paths: _paths,
        widthScale,
        heightScale,
        grid: matrixGrid,
        generatePath,
        setNodes,
        setPaths,
        setZoom,
        setOffset
    }] = useEngine({
        windowRef: canvasRef, 
        initialWindow: {
            x: 0,
            y: 0,
            zoom: 100
        }, 
        scalingFactor: 5
    });


    const [ isPortDragging, setPortDragging ] = useState<boolean>(false)

    const [ _factories, setFactories ] = useState<{[key: string]: IAbstractNodeFactory | IAbstractPathFactory}>({})
   

    //TODO memoize

    useEffect(() => {
        if(Object.keys(_factories).length > 0){
            setNodes(nodes || [])
        }
    }, [nodes, _factories])

    useEffect(() => {
        setPaths(paths || [])
    }, [paths])
  
    useEffect(() => {
        if(zoom){
            setZoom(zoom)
        }
    }, [zoom])

    useEffect(() => {
        if(offset && (offset.x != _offset.x || offset.y != _offset.y)){
           setOffset(offset)
        }
    }, [offset])


    const updateOffset = useCallback((position: {x: number, y: number}, lastPos: {x: number, y: number}) => {
        
        if(!finite){
            let new_offset = {
                x: (_offset.x || 0) - (lastPos.x - position.x),
                y: (_offset.y || 0) - (lastPos.y - position.y)
            }
            setOffset((_offset: any) => ({
                x: (_offset.x || 0) - (lastPos.x - position.x),
                y: (_offset.y || 0) - (lastPos.y - position.y)
            }))
            onViewportChanged?.({offset: new_offset, zoom: _zoom})
        }else if(finite && _zoom < 100){

            let new_offset = {
                x: (_offset.x || 0) - (lastPos.x - position.x),
                y: (_offset.y || 0) - (lastPos.y - position.y)
            }
            
            if(new_offset.x > 0) new_offset.x = 0;
            if(new_offset.y < 0) new_offset.y = 0;
            //TODO add +viewport.width +viewport.height

            setOffset((_offset: any) => {

                const bounds = canvasRef.current?.getBoundingClientRect()

                const clientWidth = bounds?.width
                const clientHeight = bounds?.height

    
                let x = (_offset.x || 0) - (lastPos.x - position.x);
                let y = (_offset.y || 0) - (lastPos.y - position.y);


                if( x > 0) x = 0;
                if( y > 0) y =0;

                let adjustedWidth = (clientWidth || 0) * (_zoom / 100)
                let adjustedHeight = (clientHeight || 0) * (_zoom / 100)


                if(Math.abs(x) + adjustedWidth > (clientWidth || 0)) x = 0 - ((clientWidth || 0) - adjustedWidth)
                if(Math.abs(y) + adjustedHeight > (clientHeight || 0)) y = 0 - ((clientHeight || 0) - adjustedHeight)

                return {x,y};
            })
            onViewportChanged?.({offset: new_offset, zoom: _zoom})

        }

    }, [_offset, _zoom])

 

    const onMouseDown = (evt: React.MouseEvent) => {
        
        onBackdropClick?.();

        setMenuPos(undefined)
        if (evt.button == 0) {
            //Left
            isDragging.current.dragging = true
            onDrag(evt, (evt, position, lastPos, finished) => {
                if(!finished && isDragging && position && lastPos){
                    updateOffset(position, lastPos)
                }
                if(finished){
                    isDragging.current.dragging = false
                }
            })
        } else if (evt.button == 2) {
            //Right
            // alert("Right click")
        }
    }

    const onTouchStart = (evt: React.TouchEvent) => {
        setMenuPos(undefined)
            //Left
            isDragging.current.dragging = true
            onTouchDrag(evt, (evt, position, lastPos, finished) => {
                if(!finished && isDragging && position && lastPos){
                    updateOffset(position, lastPos)
                }
                if(finished){
                    isDragging.current.dragging = false
                }
            })
       
    }

    //TODO add zoom rectifier when bounded to bring offset back to bounds when zooming
    const onWheel = (evt: React.WheelEvent) => {
        let oldZoomFactor = _zoom / 100;

        let zoomY = evt.deltaY / 60;

        let new_zoom = _zoom + zoomY;

        if(new_zoom > 100 && finite){
            new_zoom = 100;
        }

        let zoomFactor = (new_zoom) / 100;
        
        let new_offset = _offset || {x: 0, y: 0};

        setZoom(new_zoom)

        if(canvasRef.current){
            const bounds = canvasRef.current?.getBoundingClientRect()

            const clientWidth = bounds.width
            const clientHeight = bounds.height

            const widthDiff = clientWidth * zoomFactor - clientWidth * oldZoomFactor
            const heightDiff = clientHeight * zoomFactor - clientHeight * oldZoomFactor

            const clientX = evt.clientX - bounds?.left
            const clientY = evt.clientY - bounds?.top

            const xFactor = (clientX - (_offset.x || 0)) / oldZoomFactor / clientWidth
            const yFactor = (clientY - (_offset.y || 0)) / oldZoomFactor / clientHeight

            new_offset = {
                x: (_offset.x || 0) + widthDiff * xFactor,
                y: (_offset.y || 0) + heightDiff * yFactor
            }

            if(finite){
                if(new_offset.x > 0) new_offset.x = 0;
                if(new_offset.y > 0) new_offset.y = 0;

                let adjustedWidth = (clientWidth || 0) * (_zoom / 100)
                let adjustedHeight = (clientHeight || 0) * (_zoom / 100)

                if(Math.abs(new_offset.x) + adjustedWidth > (clientWidth || 0)) new_offset.x = 0 - ((clientWidth || 0) - adjustedWidth)
                if(Math.abs(new_offset.y) + adjustedHeight > (clientHeight || 0)) new_offset.y = 0 - ((clientHeight || 0) - adjustedHeight)

            }

            setOffset(new_offset)
        }

        onViewportChanged?.({offset: new_offset, zoom: _zoom})
    }



    const dragPort = (e: React.MouseEvent, handleId?: string, nodeId?: string) => {

        let id = nanoid();
        setPortDragging(true)

        if(nodeId && handleId){
            let node = _nodes.find((a: any) => a.id == nodeId)
            let port = node?.ports?.find((a: InfinitePort) => a.name == handleId);

            let points: any = [];

            let path : any = {
                id,
                source: nodeId,
                sourceHandle: handleId,
                target: null,
                points: points
            }
        
            let p : any[] = _paths?.slice() || [];
            p.push(path)

            onPathCreate?.(path)


    const updatePathPosition = throttle((point: InfiniteCanvasPosition) => {
      
        let p = _paths?.slice() || [];
        let ix = p.map((x: any) => x.id).indexOf(id)

        let path;

            point = lockToGrid(point, snapToGrid || false, grid)
  
            let _points = [
                point
            ]
            if(ix > -1){
                path = {
                    ...p[ix],
                    points: _points
                }                    

            }else{
               path = {
                    id,
                    source: nodeId,
                    sourceHandle: handleId,
                    target: null,
                    points: _points
                } as any
            }
            onPathUpdate?.(path)

    }, 100)

        onDrag(e, (event, position = {x: 0, y: 0}, lastPos, finished) => {
            if(!finished){
                let point = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, {x: position?.x, y: position?.y})
                updatePathPosition(point)
            }else{
                setPortDragging(false)

                let target = (event?.target as HTMLElement)
                if(target.hasAttribute('data-nodeid')){

                    let nodeId = target.getAttribute('data-nodeid') || ''

                    if(target.hasAttribute('data-handleid')){
                        //Static Ports

                        let handleId = target.getAttribute('data-handleid') || ''
                        onPathUpdate?.(linkPath(path, nodeId, handleId))

                    }else{
                        //Dynamic Ports
                        let {x: adjusterX, y: adjusterY} = nodes?.find((a) => a.id == nodeId) || {x: 0, y: 0}
                        const { x, y } = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, position);

                        let newX = x - adjusterX;
                        let newY = y - adjusterY;

                        onPathUpdate?.(linkPath(path, nodeId, {x: newX, y: newY}));
                    }   

                    // let current_path = _paths?.find((a: InfiniteCanvasPath) => a.id == path.id)
                    // console.log({current_path, paths: _paths, path})
                    // if(!current_path) return;

          //  onPathsChanged?.(linkPath(_paths.current, path.id, nodeId, handleId))
                }
            }
        })

        }
    }

    const viewport = {
        offset: _offset,
        zoom: _zoom
    }



    const reportPortPosition = (opts: {
        nodeId: string, 
        handleId: string, 
        position: {x: number, y: number, width: number, height: number}
    }) => {

        let point = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, opts.position)

        let nodes : InfiniteCanvasNode[] = _nodes?.slice() || [];

        let node = nodes?.find((a) => a.id == opts.nodeId) || {x: 0, y: 0, ports: []}

        let node_ix = (nodes?.map((x) => x.id) || []).indexOf(opts.nodeId)

        let _ports = Object.assign({}, portRef.current);

        _ports[`${opts.nodeId}:${opts.handleId}`] = {
            relativeX: point.x - node.x,
            relativeY: point.y - node.y,
            x: opts.position.x,
            y: opts.position.y,
            width: opts.position.width,
            height: opts.position.height
        }

        setPorts(_ports)

        
    }

    const onDragOver = (e: React.DragEvent) => {
        if(onNodeCreate){
            e.preventDefault()
        }
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if(e.key == "Delete" || e.key == "Backspace"){
            onDelete?.()
        }
    }
   // const onSelect = (key: "node" | "path", id: string) => {
    //     setSelected({type: key, id: id})
    // }

    const _onDrop = (e: React.DragEvent) => {
        if(onNodeCreate){
            let data = JSON.parse(e.dataTransfer.getData('infinite-canvas'))
            let pos = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, {x: e.clientX, y: e.clientY})
            onNodeCreate(pos, data)
            isDragging.current.dragging = false
        }
    }

    const onContextMenu = (e : React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()

        
    }

    const openContextMenu = (pos: {x: number, y: number}, payload: {type: "node" | "path", id: string}) => {
        let bounds = canvasRef.current?.getBoundingClientRect()

        onSelect?.(payload.type, payload.id)

        setMenuPos({
            x: pos.x - (bounds?.x || 0),
            y: pos.y - (bounds?.y || 0)
        })
    }

    const bounds = canvasRef?.current?.getBoundingClientRect();


    const context : IInfiniteCanvasContext =  {
        style: style,
        finite,
        snapToGrid: snapToGrid,
        grid: {
            ...grid
        },
        editable: editable,
        router: router,
        factories: _factories,
        nodes: _nodes,
        setNodes: setNodes,
        paths: _paths,
        setPaths: setPaths,
        ports: ports,

        assets: assets,
        nodeRefs,

        getRelativeCanvasPos: (pos) => {
            return getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, pos)
        },

        darkMode: true,
        zoom: 100 / _zoom,
        offset: _offset,
        isPortDragging,
        openContextMenu: openContextMenu,
        addPathPoint: useCallback((id, ix, point) => {
            let rp = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, point)
            
            let current_path = _paths?.find((a: InfiniteCanvasPath) => a.id == id)
            if(!current_path) return;
            onPathUpdate?.(addPathSegment(current_path, ix, rp))
            
        }, [_paths, _offset, _zoom]),
        updatePathPoint: useCallback((id, ix, point) => {
            let rp = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, point)
            rp = lockToGrid(rp, snapToGrid, grid)

            let current_path = _paths?.find((a: InfiniteCanvasPath) => a.id == id)

            if(!current_path) return;
            
            let updated = updatePathSegment(Object.assign({}, current_path), ix, rp);
            onPathUpdate?.(updated)

        }, [_paths, _offset, _zoom]),
        linkPath: useCallback((id, node, handle) => {
            let current_path = _paths?.find((a: InfiniteCanvasPath) => a.id == id)
            if(!current_path) return;
            onPathUpdate?.(linkPath(current_path, node, handle))
        }, [_paths]),
        // setNodeRefs,
        dragPort: dragPort,
        updateNodeBounds: (node, updateFn) => {

            let fNode = (_nodes || []).find((a: InfiniteCanvasNode) => a.id == node);

            if(!fNode) return console.debug('No node found for id ', node);

            let updated = updateFn(fNode)

            onNodeUpdate?.(updated)

        },
        updateNode: (node, position) => {
            // if(node) onSelect?.("node", node)

            
            let pos = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, position)
            pos = lockToGrid(pos, snapToGrid || false, grid)
            if(editable && pos){
                let fNode = (_nodes || []).find((a: InfiniteCanvasNode) => a.id == node)
                if(!fNode) return;
                let updatedNode = moveNode(fNode, pos)
                
                onNodeUpdate?.(updatedNode)
            }

            
            // let node = _nodes.find((a) => a.id == node.id)
        },
        reportPosition: reportPortPosition,
        engine: {
            generatePath
        },
        selected,
        selectNode: (node) => onSelect?.('node', node),
        selectPath: (path) => onSelect?.('path', path),
        changeZoom: (z) => setZoom(_zoom + (z)),
        onRightClick: (item, pos) => {
        const position = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, pos)
        onRightClick?.(item, position)
        },
        information
    }


    useEffect(() => {
        if(factories){
            let f : any = {};
            factories.forEach((factory) => {
                let factoryInstance = factory(context)
                
                f[factoryInstance.type] = factoryInstance
            })
            setFactories(f)
        }
    }, [factories])

    return (
        <InfiniteCanvasContext.Provider
            value={{style: style,
                snapToGrid: snapToGrid,
                grid: {
                    ...grid
                },
                finite,
                editable: editable,
                router: router,
                factories: _factories,
                nodes: _nodes,
                setNodes: setNodes,
                paths: _paths,
                setPaths: setPaths,
                ports: ports,
            
                assets: assets,
                nodeRefs,
            
                getRelativeCanvasPos: (pos) => {
                    return getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, pos)
                },
            
                darkMode: true,
                zoom: 100 / _zoom,
                offset: _offset,
                isPortDragging,
                openContextMenu: openContextMenu,
                addPathPoint: useCallback((id, ix, point) => {
                    let rp = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, point)
                    
                    let current_path = _paths?.find((a: InfiniteCanvasPath) => a.id == id)
                    if(!current_path) return;
                    onPathUpdate?.(addPathSegment(current_path, ix, rp))
                }, [_paths, _offset, _zoom]),
                updatePathPoint: useCallback((id, ix, point) => {
                    let rp = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, point)
                    rp = lockToGrid(rp, snapToGrid, grid)

            
                    let current_path = _paths?.find((a: InfiniteCanvasPath) => a.id == id)
                    
                    if(!current_path) return;
                    
                    let updated = updatePathSegment(Object.assign({}, current_path), ix, rp);
                    onPathUpdate?.(updated)
            
                }, [_paths, _offset, _zoom]),
                linkPath: useCallback((id, node, handle) => {
                    let current_path = _paths?.find((a: InfiniteCanvasPath) => a.id == id)
                    if(!current_path) return;
                    onPathUpdate?.(linkPath(current_path, node, handle))
                }, [_paths]),
                // setNodeRefs,
                dragPort: dragPort,
                updateNodeBounds: (node, updateFn) => {

                    let fNode = (_nodes || []).find((a: InfiniteCanvasNode) => a.id == node);

                    if(!fNode) return console.debug('No node found for id ', node);

                    let updated = updateFn(fNode)

                    onNodeUpdate?.(updated)

                },
                updateNode: (node, position) => {
                    // if(node) onSelect?.("node", node)
            
                    let pos = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, position)
                    pos = lockToGrid(pos, snapToGrid || false, grid)
                    if(editable && pos){
                        let fNode = (_nodes || []).find((a: InfiniteCanvasNode) => a.id == node)
                        if(!fNode) return;
                        let updatedNode = moveNode(fNode, pos)
                        
                        onNodeUpdate?.(updatedNode)
                        
            
                    }
                    // let node = _nodes.find((a) => a.id == node.id)
                },
                reportPosition: reportPortPosition,
                engine: {
                    generatePath
                },
                selected,
                selectNode: (node) => onSelect?.('node', node),
                selectPath: (path) => onSelect?.('path', path),
                changeZoom: (z) => setZoom(_zoom + (z)),
                onRightClick: (item, pos) => {
                   const position = getRelativeCanvasPos(canvasRef, {offset: _offset, zoom: _zoom}, pos)
                   onRightClick?.(item, position)
                },
                information}}>
            <div
                onContextMenu={onContextMenu}
                ref={canvasRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onWheel={onWheel}
                onDragOver={onDragOver}
                onDrop={_onDrop}
                className={className}
            >

                {/* <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                    {new Array(Math.ceil(heightScale || 100) || 100).fill(0).map((_, i) => {
                        return new Array(Math.ceil(widthScale || 100) || 100).fill(0).map((_i, j) => {
                            return (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: `calc(100% / ${heightScale} * ${i})`,
                                        left: `calc(100% / ${widthScale} * ${j})`,
                                        width: `calc(100% / ${widthScale})`,
                                        height: `calc(100% / ${heightScale})`,
                                        background: matrixGrid?.[i]?.[j] == 1 ? '#000' : '#dfdfdf',
                                    }}
                                    >
                                </div>
                            )
                        })   
                    })}
                </div> */}
                
                {(contextMenu || []).length > 0 && <ContextMenu 
                    menu={contextMenu || []}
                    open={Boolean(menuPos != undefined)} 
                    y={menuPos?.y} 
                    x={menuPos?.x}/>}
                <GridLayer />
                <PathLayer />
                <NodeLayer />
                <InformationLayer />
                {children}
            </div>
            {menu}
        </InfiniteCanvasContext.Provider>
    )
}

export const InfiniteCanvas = styled(BaseInfiniteCanvas)`
    display: flex;
    flex: 1;
    position: relative;
    overflow: hidden;
    user-select: none;
`