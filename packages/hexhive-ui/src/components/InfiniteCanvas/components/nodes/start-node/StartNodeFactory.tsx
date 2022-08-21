import React from "react";
import { IInfiniteCanvasContext } from "../../../context/context";
import { AbstractNodeFactory, IAbstractNodeFactory } from "../../../InfiniteCanvas";
import { StartNode } from "./StartNode";

export const StartNodeFactory : AbstractNodeFactory = (context: IInfiniteCanvasContext) : IAbstractNodeFactory => {
    
    return {
        type: 'start-node',
        renderNode: (node: any) => {
            return (<StartNode {...node} />)
        },
        parseModel: (model: any) => {
            return {
                ...model,
                ports: model.ports ? model.ports : [
                    {
                        name: 'out',
                        type: 'base'
                    }
                ]
            }
        }
    }

}