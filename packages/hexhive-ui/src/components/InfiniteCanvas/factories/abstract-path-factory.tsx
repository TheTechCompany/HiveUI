/*
    Base Path Factory

    Methods
    -------
    renderPath(path: CanvasPath)
*/

import { IInfiniteCanvasContext } from "../context/context";
import { InfiniteCanvasPath, InfiniteCanvasPosition } from "../types";
import { AbstractFactory } from "./abstract-factory";

export interface IAbstractPathFactory extends AbstractFactory{
    renderPathPoint?(path: InfiniteCanvasPath, point: InfiniteCanvasPosition, setPoint: (point: InfiniteCanvasPosition) => void, ix: number): JSX.Element | null;
    renderPathSegment(path: InfiniteCanvasPath, points: InfiniteCanvasPosition[], setPoints: (points: InfiniteCanvasPosition[]) => void, ix: number): JSX.Element;
    parseModel?(model: InfiniteCanvasPath): any;
}

export type AbstractPathFactory = (context: IInfiniteCanvasContext) => IAbstractPathFactory;

// export abstract class AbstractPathFactory extends AbstractFactory {
    
//     renderPath(path: InfiniteCanvasPath, context: IInfiniteCanvasContext){
//         return [this.generateLine(path, context), this.generateHandles(path, context)];
//     };


//     generateHandles(
//         path: InfiniteCanvasPath, 
//         context: IInfiniteCanvasContext
//     ){  
//         const { points, targetHandle } = path;

//         let p = points.slice(0, targetHandle ? points.length - 1 : points.length)
//         let handles = p.map((point, ix) =>  ix != 0 && this.renderPathPoint(path, point, ix, context))
//         return  handles;
//     }


//     generateLine(
//         path: InfiniteCanvasPath, 
//         context: IInfiniteCanvasContext
//     ){
//         const { points } = path;

//         let init : InfiniteCanvasPosition[][] = [];
//         let pairs = points.reduce((result, value, index, array) => {
//             if(index < array.length - 1){
//                 result.push(array.slice(index, index+ 2))
//             }
//             return result;
//         }, init)

//         return pairs.map((pair, ix) => this.renderPathSegment(path, pair, ix, context))
//     }

//     renderPathPoint(path: InfiniteCanvasPath, point: InfiniteCanvasPosition, ix: number, context: IInfiniteCanvasContext): JSX.Element | null {
//         return null;
//     };


//     abstract renderPathSegment(path: InfiniteCanvasPath, points: InfiniteCanvasPosition[], ix: number, context: IInfiniteCanvasContext): JSX.Element;
// }