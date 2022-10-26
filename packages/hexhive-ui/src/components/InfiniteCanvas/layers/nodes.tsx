import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { InfiniteCanvasNode, InfiniteCanvasPosition } from '../types/canvas';
import { getHostForElement } from '../utils';
import { InfiniteCanvasContext } from '../context/context';
import { NodeIdContext } from '../context/nodeid';
import { moveNode } from '../utils/canvas';
import { IAbstractNodeFactory } from '../factories';

export interface NodeLayerProps {
    className?: string;
    status?: {
        [key: string]: any;
    }
  
    onClick?: Function;
}

export const BaseNodeLayer : React.FC<NodeLayerProps> = ({
    status = {},
    onClick = () => {},
    className
}) => {
    const {
        editable,
        selected,
        factories = {},
        updateNode,
        selectNode,
        zoom, 
        assets = {}, 
        offset, 
        nodes:_nodes = [],
        setNodes,
        nodeRefs,
        openContextMenu,
        onRightClick,
        getRelativeCanvasPos
    } = useContext(InfiniteCanvasContext)

   /* const nodeModels = useMemo(() => {
        let models : any = {};
        nodes.forEach((x) => 
            models[x.id || ''] = factories[x.type].generateModel(x)
        )
        return models;
    }, [nodes])

    */


    const _moveNode = (node: string, position: InfiniteCanvasPosition) => {
        
        // if(node) onSelect?.("node", node)

        let pos = getRelativeCanvasPos?.(position)
        // pos = lockToGrid(pos, snapToGrid || false, grid)
        if(editable && pos){
            let fNode = (_nodes || []).find((a) => a.id == node)
            if(!fNode) return;
            let updatedNode = moveNode(fNode, pos)
            
            let newNodes = _nodes.slice();
            let ix = newNodes.map(x => x.id).indexOf(node)
            newNodes[ix] = {
                ...newNodes[ix],
                ...updatedNode
            }

            setNodes?.(newNodes)
        }
    }

    // const [ _nodes, setNodes ] = useState<InfiniteCanvasNode[]>([]);


    // const itemRefs = useRef<{[key: string]: HTMLDivElement | null}>({})

    const [ hoverEl, setHoverEl ] = useState<any>(null);

    const [ hoverNode, setHoverNode ] = useState<any>(null);

    // useEffect(() => {
    //     setNodes?.(nodes);
    // }, [nodes])


    const renderAssetContainer = (node: InfiniteCanvasNode, children: any) => {
        
        let factory = factories?.[node.type];

        const props = {
            'data-nodeid': node.id,
            ref: (element: any) => {
                if(!nodeRefs) return;
                nodeRefs.current[node.id] = element;
            },
            className: `node-container ${(selected?.find((a) => a.key == 'node' && a.id == node.id) != null) ? 'selected': ''}`,
            onClick: (e: any) => {
                selectNode?.(node.id)
            },
            onMouseDown: (evt: any) => mouseDown(node.id, evt),
            style: {
                // pointerEvents: 'all',
                left: node.x, 
                top: node.y,
                transform: `rotate(${node?.extras?.rotation}deg)
                            scaleX(${node?.extras?.scaleX || 1})
                            scaleY(${node?.extras?.scaleY || 1})`
            }
        }

        if((factory as any).renderNodeContainer){
            return (factory as any).renderNodeContainer(node, props, children)
        }else{
            return (
                <div
                    {...props}
                    onContextMenu={(e) => {
                        openContextMenu?.({x: e.clientX, y: e.clientY}, {type: 'node', id: node.id})
                    }}
                 
                  >
                    {children}
                </div>
            )
        }

    }

    const renderAssetBundle = (key: string, node: InfiniteCanvasNode, selected?: boolean) => {

        let value = node.value ? status[node.value] : status[key];

        let factory = factories?.[node.type];
        
        if(!factory){
            console.error(`Factory not found for type ${node.type}`)
            return null;
        }
        
        // if(!factory.renderNode){ return null; }

        // if(!(factory instanceof IAbstractNodeFactory)){
        //     console.error(`Factory ${node.type} is not an instance of AbstractWidgetFactory`)
        //     return null;
        // }  

        node.isSelected = selected;
        
        if(factory){
            return (factory as any).renderNode(node)
        }

    }

    const getDirection = (dir?: string) => {
        let deg = 0;
        switch(dir){
            case 'left-right':
                deg = 0;
                break;
            case 'right-left':
                deg = 180;
                return `scaleX(-1)`;
            case 'up-down':
                deg = 90;
                break;
            case 'down-up':
                deg = 270;
                return `rotate(270deg) scaleY(-1)`
            default :
                deg = 0;
        }
        return `rotate(${deg}deg)`
    }

    const nodeHover = (target: HTMLDivElement, node_key: any) => {
        if(_nodes && _nodes[node_key]){
            setHoverEl(target)
            let node = _nodes[node_key]
            node.label = node_key;
            setHoverNode(node)
        }
    }
    
    const nodeHoverEnd = () => {
        setHoverEl(null)
        setHoverNode(null)
    }

    const nodeClick = (node?: any) => {
        if(onClick){
            onClick(node.asset, node.label)
        }
     //   console.log(node)
    }

    const mouseDown = (elem: string, evt: React.MouseEvent) => {
        evt.stopPropagation()
        
        if(!nodeRefs) return;

        if(evt.button == 0){
            let doc = getHostForElement(evt.target as HTMLElement)


            let offsetRect : any = {
                x: 0,
                y: 0
            }
            let rect = nodeRefs.current[elem]?.getBoundingClientRect()
            if(rect){
                offsetRect = {
                    x: rect.x - evt.clientX,
                    y: rect.y - evt.clientY
                }
            }
            //start dragging

            const mouseMove = (evt: MouseEvent) => {
                evt.stopPropagation()

                _moveNode?.(elem, {
                    x: evt.clientX + offsetRect?.x, 
                    y: evt.clientY + offsetRect?.y
                })
            }

            const mouseUp = (evt: MouseEvent) => {
                evt.stopPropagation()
                updateNode?.(elem, {
                    x: evt.clientX + offsetRect?.x, 
                    y: evt.clientY + offsetRect?.y
                })
                doc.removeEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
                doc.removeEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
            }

            doc.addEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
            doc.addEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
        }else{
            // alert("Right")
            onRightClick?.(elem, {
                x: evt.clientX,
                y: evt.clientY
            })
        }
    }

    return (
        <div 
            className={className} 
            style={{
                pointerEvents: 'none',
                transform: `matrix(${zoom}, 0, 0, ${zoom}, ${offset.x}, ${offset.y})`
            }}>
           {/* <Popover
                style={{pointerEvents: 'none'}}
                disableRestoreFocus
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right'
                }}
                open={Boolean(hoverEl)}
                anchorEl={hoverEl}>
                <div className="info-popup">
                    <Typography variant="subtitle1">{hoverNode && hoverNode.label}</Typography>
                    <Typography variant="subtitle2">{hoverNode && status && (status[hoverNode.value] || status[hoverNode.label])}</Typography>
                </div>
            </Popover>*/}
            {_nodes && _nodes.sort((a, b) => (a.zIndex || 1) - (b.zIndex || 1)).map((node) => renderAssetContainer(
                    node,
                    (<NodeIdContext.Provider value={{
                        nodeId: node.id,
                        rotation: node?.extras?.rotation || 0,
                        scaleX: node?.extras?.scaleX || 1,
                        scaleY: node?.extras?.scaleY || 1,
                        position: {
                            x: node.x,
                            y: node.y
                        },
                        dimensions: {
                            width: node.width || 0,
                            height: node.height || 0
                        }
                    }}>
                    {renderAssetBundle(node.id, node, (selected?.find((a) => a.key == "node" && a?.id == node.id) != undefined))}
                    </NodeIdContext.Provider>)
                
                
            ))}
        </div>
    )
}

export const NodeLayer = styled(BaseNodeLayer)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform-origin: 0 0;


    .info-popup{
        display: flex;
        flex-direction: column;
        padding: 8px;
    }

    .menu-dialog{
        margin-left: 10px;
    }

    .menu-dialog:before{
        content: "";
        position: absolute;
        top: 50%;
        left: -10px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-right: 10px solid white;
        border-bottom: 5px solid transparent;
    }

    .node-container{
        position: absolute;
        cursor: pointer;
    }

   

    .started path, .started circle{
        stroke: green;
    }
    .open path, .open circle{
        stroke: green;
    }

    .closing path, .closing circle, .opening path, .opening circle{
        stroke: brown;
    }

    .starting path, .starting circle, .stopping path .stopping circle{
        stroke: brown;
    }

    .closed path, .closed circle{
        stroke: red;
    }

    .stopped path, .stopped circle{
        stroke: red;
    }
`