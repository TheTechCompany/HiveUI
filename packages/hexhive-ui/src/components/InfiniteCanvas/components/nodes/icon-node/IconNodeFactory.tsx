import React from "react";
import { IAbstractNodeFactory } from "../../../factories";
import { AbstractNodeFactory } from "../../../InfiniteCanvas";
import { IconNode } from "./IconNode";

export const IconNodeFactory : AbstractNodeFactory = (): IAbstractNodeFactory => {

    return {
        type: 'icon-node',
        renderNode: (node: any) => {
            return <IconNode {...node} />
        },
        parseModel: (model: any) => {
            return {
                ...model,
                ports: model.ports ? model.ports : [
                    {
                        name: "in",
                        type: "base"
                        
                    },
                    {
                        name: 'out',
                        type: 'base'
                    }
                ]
            }
        }
        // return (<IconNode  {...event} />)
    }


}