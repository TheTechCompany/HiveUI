import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { InfiniteCanvasNode, InfiniteCanvasPath, InfiniteCanvasPosition } from "../types";
import * as PF from 'pathfinding'
import { getRelativeCanvasPos } from "../utils/canvas";
import { AStarFinder } from "../finders/BiAStar";
import ngraph from 'ngraph.path'
import createGraph from 'ngraph.graph'

export interface CanvasWindow {
    x?: number;
    y?: number;
    width?: number;
    height?: number
    zoom?: number;
}

export interface Engine {
    nodeRefs: MutableRefObject<{ [key: string]: any }>;
    nodes: InfiniteCanvasNode[]
    paths: InfiniteCanvasPath[]
    offset: InfiniteCanvasPosition;
    zoom: number;
    grid?: any[][];
    widthScale?: number;
    heightScale?: number;
    generatePath: (start: InfiniteCanvasPosition, end: InfiniteCanvasPosition) => {x: number, y: number}[];
    setZoom: React.Dispatch<React.SetStateAction<number>>; 
    setOffset: React.Dispatch<React.SetStateAction<InfiniteCanvasPosition>>; // (offset: InfiniteCanvasPosition) => void;
    setNodes: React.Dispatch<React.SetStateAction<InfiniteCanvasNode[]>> //(nodes: InfiniteCanvasNode[]) => void;
    setPaths: React.Dispatch<React.SetStateAction<InfiniteCanvasPath[]>>; //(paths: InfiniteCanvasPath[]) => void;
    nodeBounds: {width: number, height: number, x: number, y: number} | null
    canvasBounds: {width: number, height: number} | null
}

export interface EngineOptions {
    windowRef: MutableRefObject<any>;
    initialWindow: CanvasWindow;
    scalingFactor: number;
}

export const useEngine = (options: EngineOptions): [Engine] => {

    const [bounds, setBounds] = useState<{ width: number, height: number }>({ width: 100, height: 100 });

    const [ nodeBounds, setNodeBounds ] = useState<{x: number, y: number, width: number, height: number} | null>(null)

    const { widthScale, heightScale } = useMemo(() => {
        return {
            widthScale: Math.floor(bounds.width / options.scalingFactor),
            heightScale: Math.floor(bounds.height / options.scalingFactor)
        }
    }, [bounds.width, bounds.height])


    useEffect(() => {

        if(!options.windowRef) return;

        const elem : any = options.windowRef.current;

        const resizeListener = () => {
            const b = elem.getBoundingClientRect()
            setBounds({
                width: b.width,
                height: b.height
            })
        }

        resizeListener();

        elem.addEventListener('resize', resizeListener);

        return () => {
            elem.removeEventListener('resize', resizeListener)
        }
    }, [options.windowRef.current])

    // const bounds = windowRef.current?.getBoundingClientRect()

    const nodeRefs = useRef<{[key: string]: any}>({})

    const [nodes, setNodes] = useState<InfiniteCanvasNode[]>([]);
    const [paths, setPaths] = useState<InfiniteCanvasPath[]>([])

    const [offset, setOffset] = useState<InfiniteCanvasPosition>({ x: options.initialWindow.x || 0, y: options.initialWindow.y || 0 })
    const [zoom, setZoom] = useState<number>(options.initialWindow.zoom || 100);

    useEffect(() => {
        if(nodes.length > 0){
            let minX = Math.min(...nodes.map((x) => x.x ))
            let maxX = Math.max(...nodes.map((x) => x.x + (x.width || 0) ))
            let minY = Math.min(...nodes.map((x) => x.y ))
            let maxY = Math.max(...nodes.map((x) => x.y + (x.height || 0) ))

            let width = maxX - minX;
            let height = maxY - minY;

            setNodeBounds({
                width,
                height,
                x: minX,
                y: minY
            })
        }
    }, [nodes])

    // const {minimap, grid, graph} = useMemo(() => {

    //     const graph = createGraph()

    //     const nodes = Object.keys(nodeRefs.current).map(key => {
    //         const bounds = nodeRefs.current[key].getBoundingClientRect()

    //         const { x, y } = getRelativeCanvasPos(options.windowRef, {
    //             offset,
    //             zoom
    //         }, {
    //             x: bounds.x,
    //             y: bounds.y
    //         })
    //         return {
    //             id: key,
    //             x,
    //             y,
    //             width: bounds.width,
    //             height: bounds.height
    //         }
    //     })

    //     console.log({nodes, offset})

    //     let window_nodes = nodes.filter((a) => {
    //         let xMin = Math.floor(a.x);
    //         let xMax = Math.ceil(a.x + (a.width || 50));
    //         let yMin = Math.floor(a.y);
    //         let yMax = Math.ceil(a.y + (a.height || 50));

    //         return ((xMin > (offset.x || 0) || (xMax) > -(offset.x || 0)) && xMin < -(offset.x || 0) + (bounds.width || 0)) &&
    //             ((yMin > -(offset.y || 0) || (yMax) > -(offset.y || 0)) && yMin < -(offset.y || 0) + (bounds.height || 0))
    //     })

    //     console.log({window_nodes})

    //     let node_ids = window_nodes.map((x) => x.id);

    //     let window_paths = paths.filter((a) => {
    //         return node_ids.indexOf(a.source) > -1 || (a.target && node_ids.indexOf(a.target) > -1)
    //     })

    //     let widthFactor = Math.floor((bounds.width || 0) / (options.scalingFactor || 5))
    //     let heightFactor = Math.floor((bounds.height || 0) / (options.scalingFactor || 5))

    //     let grid = new Array(heightFactor).fill(0).map((x, ix) => {
           
    //         return new Array(widthFactor).fill(ASTAR ? 1 : 0)
    //     })

  
    //     // graph.
    //     // graph.addNode()

    //     const { x, y } = offset;

    //     let blocked_nodes : any[] = [];

    //     window_nodes.forEach((node) => {
    //         let startX = Math.floor((node.x + (x || 0)) / (options.scalingFactor || 5))
    //         let endX = Math.ceil(((node.x + (node.width || 0)) + (x || 0)) / (options.scalingFactor || 5))
    //         let startY = Math.floor((node.y + (y || 0)) / (options.scalingFactor || 5))
    //         let endY = Math.ceil(((node.y + (node.height || 0)) + (y || 0)) / (options.scalingFactor || 5))

    //         for (let x = startX - 1; x < endX + 1; x++) {
    //             for (let y = startY - 1; y < endY + 1; y++) {
    //                 if (!(x >= 0 && y >= 0)) continue;
    //                 if(grid[Math.floor(y)] == null) continue;
    //                 if(grid[Math.floor(y)][Math.floor(x)] == null) continue;

    //                 grid[Math.floor(y)][Math.floor(x)] = ASTAR ? 0 : 1

    //                 graph.addNode(`${y}:${x}`, {x: x, y: y, weight: 1})

    //                 blocked_nodes.push(`${Math.floor(y)}:${Math.floor(x)}`)
    //                 //    console.log("Marked")
    //             }
    //         }
    //     })

    //     for(var h = 0; h < heightFactor + 1; h++){
    //         for(var w = 0; w < widthFactor + 1; w++){
    //             if(blocked_nodes.indexOf(`${h}:${w}`) < 0){
    //                 graph.addNode(`${h}:${w}`, {x: w, y: h, weight: 0})

    //                 if(blocked_nodes.indexOf(`${h - 1}:${w}`) < 0){
    //                     graph.addLink(`${h}:${w}`, `${h - 1}:${w}`, {weight: 1})
    //                 }

    //                 if(blocked_nodes.indexOf(`${h}:${w - 1}`) < 0){
    //                     graph.addLink(`${h}:${w}`, `${h}:${w - 1}`, {weight: 1})
    //                 }

    //                 if(blocked_nodes.indexOf(`${h + 1}:${w}`) < 0){
    //                     graph.addLink(`${h}:${w}`, `${h + 1}:${w}`, {weight: 1})
    //                 }
    //                 if(blocked_nodes.indexOf(`${h}:${w + 1}`) < 0){
    //                     graph.addLink(`${h}:${w}`, `${h}:${w + 1}`, {weight: 1})
    //                 }

    //             }
    //         }
    //     }

    //     // this.matrix = new PF.Grid(grid);

    //     return {
    //         minimap: new PF.Grid(grid),
    //         grid: grid,
    //         graph
    //     }

    // }, [bounds, nodes, nodeRefs.current, offset, zoom])

    // const generateAStarPath = (from : InfiniteCanvasPosition, to : InfiniteCanvasPosition) => {
    //     if(!(grid.length > 0)) return [];

    //     const astar = ngraph.aStar(graph, {
    //         distance: (fromNode, toNode) => {
    //             let dx = fromNode.data.x - toNode.data.x;
    //             let dy = fromNode.data.y - toNode.data.y;
            
    //             return Math.sqrt(dx * dx + dy * dy);
    //         },
    //         heuristic: (fromNode, toNode) => {
    //             let dx = fromNode.data.x - toNode.data.x;
    //             let dy = fromNode.data.y - toNode.data.y;
            
    //             return Math.sqrt(dx * dx + dy * dy);
    //         }
    //     })
    //     // const nbaFinder = ngraph.nba(graph)


    //     // let graph = new Graph(grid);

    //     let startX = Math.floor(from.x / (options.scalingFactor || 5))
    //     let endX = Math.floor(to.x / (options.scalingFactor || 5))
    //     let startY = Math.floor(from.y / (options.scalingFactor || 5))
    //     let endY = Math.floor(to.y / (options.scalingFactor || 5))
    //     console.log({widthScale, heightScale})

    //     const path = astar.find(`${startY}:${startX}`, `${endY}:${endX}`)
        
    //     console.log("NBA", {path})
    //     return path.map((x) => ({
    //         x: x.data.x * (options.scalingFactor || 5),
    //         y: x.data.y * (options.scalingFactor || 5)
    //     }));
    //     // let start = graph.grid[startY][startX]
    //     // let end = graph.grid[endY][endX]

    //     // const searchResult = astar.search(graph, start, end)
    //     // console.log("AStar", {searchResult, start, end, startX, endX, startY, endY})
    //     // return searchResult.map((x: any) => ({
    //     //     x: x.x * (options.scalingFactor || 5),
    //     //     y: x.y * (options.scalingFactor || 5)
    //     // }));

    // }

    const generatePath = (from: InfiniteCanvasPosition, to: InfiniteCanvasPosition) : InfiniteCanvasPosition[] => {
    //     let localMatrix = minimap?.clone();
    //     console.log("Generate Path")

    //     if(!localMatrix) return [];

    //     let path = pathFinderInstance?.findPath(
    //         Math.floor((from.x) / (options.scalingFactor || 5)),
    //         Math.floor((from.y) / (options.scalingFactor || 5)),
    //         Math.floor((to.x) / (options.scalingFactor || 5)),
    //         Math.floor((to.y) / (options.scalingFactor || 5)),
    //         localMatrix,
    //     )

    //     path = PF.Util.compressPath(path)

    //     console.log("Generate Path", {path})

    //     return path.map((elem: any[]) => ({x: elem[0] * (options.scalingFactor || 5), y: elem[1] * (options.scalingFactor || 5)}))   
        return [];
    }

    return [
        {
            widthScale,
            heightScale,
            nodeRefs,
            nodes,
            paths,
            offset,
            zoom,
            grid: [],
            generatePath,
            setZoom,
            setOffset,
            setNodes,
            setPaths,
            nodeBounds,
            canvasBounds: bounds
        }
    ];
}