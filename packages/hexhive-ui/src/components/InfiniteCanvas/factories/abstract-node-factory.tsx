import { IInfiniteCanvasContext } from "../context/context";
import { InfiniteCanvasNode } from "../types";
import { AbstractFactory } from "./abstract-factory";


export interface GenerateWidgetEvent<T>{
    model: T
}


export interface IAbstractNodeFactory extends AbstractFactory {
    renderNode(event: any): JSX.Element;
    parseModel(model: any): any;
}

export type AbstractNodeFactory = (context: IInfiniteCanvasContext) => IAbstractNodeFactory;

// export abstract class AbstractNodeFactory extends AbstractFactory {

//     abstract generateWidget(event: any): JSX.Element;

//     abstract parseModel(model: any): any;
// }