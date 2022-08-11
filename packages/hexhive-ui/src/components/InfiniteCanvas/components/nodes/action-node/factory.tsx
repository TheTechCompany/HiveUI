import React from 'react';
import { IInfiniteCanvasContext } from '../../../context/context';
import { AbstractNodeFactory, IAbstractNodeFactory } from "../../../InfiniteCanvas";
import { InfiniteCanvasNode } from "../../../types/canvas";
import { ActionNodeWidget } from "./widget";

export const ActionNodeFactory : AbstractNodeFactory = (context: IInfiniteCanvasContext) => {
    
    return {
        type: 'action-node',
        renderNode: (node: any) => {
            return <ActionNodeWidget title={node.extras?.title}  />
        },
        parseModel: (model: any) => {
            let m : InfiniteCanvasNode = {
                id: model.id,
                type: model.type,
                x: model.x,
                y: model.y,
                extras: {
                    ...model.extras,
                },
                ports: model.ports ? model.ports : [
                    {
                        name: "inlet",
                        type: "base"
                        
                    },
                    {
                        name: 'outlet',
                        type: 'base'
                    }
                ]
            }
            
            return m;
        }
    }

}