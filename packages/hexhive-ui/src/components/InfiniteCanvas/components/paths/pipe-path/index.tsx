import React, { useContext } from "react";
import { InfiniteCanvasContext } from "../../../context/context";
import { AbstractPathFactory } from "../../../factories";
import { InfiniteCanvasPosition } from "../../../types";
import { PipeElbow, PipeElbowComponent } from "./elbow";
import { PipePosition, PipeSegment } from "./segment";

export const PipePathFactory : AbstractPathFactory = () => {

    const find_angle = (A: {x: number, y: number}, B: {x: number, y: number}, C: {x: number, y: number}) => {

        let dx1 = B.x - A.x;
        let dy1 = B.y - A.y;
        let dx2 = C.x - B.x;
        let dy2 = C.y - B.y;

        let angle = Math.atan2(dx1 * dy2 - dy1 * dx2, dx1 * dx2 + dy1 * dy2);
        // if(angle < 0) angle = angle * -1;
        angle = angle * 180 / Math.PI;

        if(angle < 0){
            // angle += 270;
        }else{
            angle += 90;
        }

        return angle;
    }


    return {
        type: 'pipe-path',
        renderPathSegment(path, points, setPoints, ix) {
            const { addPathPoint, selectPath } = useContext(InfiniteCanvasContext)

            let position: PipePosition;
            if(ix == 0 && ix + 2 == path.points.length){
                position = 'start-end';   
            }else if(ix == 0){
                position = 'start';
            }else if(ix + 2 == path.points.length){
                position = 'end'
            } else{
                position = 'link'
            }


            return (
                <PipeSegment 
                    onMouseDown={(e) => {
                        if(e.metaKey || e.ctrlKey){
                            addPathPoint?.(path.id, ix, { x: e.clientX, y: e.clientY})
                        }else{
                            selectPath?.(path.id)
                        }
                    }}
                    points={points}
                    position={position}  
                    
                    />
            )
        },
        renderPathPoint(path, point, setPoint, ix) {

            const { points } = path;

            const { linkPath, getRelativeCanvasPos, editable, updatePathPoint } = useContext(InfiniteCanvasContext);

            const startPoint = points[ix - 1]
            let endPoint = points[ix + 1]
            const handle = points[ix]

            const lastStartPoint = points[ix - 2];
            const lastEndPoint = points[ix]
            const lastHandle = points[ix - 1]

            let angle = 0;
            let lastAngle = 0;
            

            if(!endPoint) {
                //TODO return a handle
                endPoint = {x: 0, y: 0}
            }
            
            if(endPoint){

                const dx1 = startPoint.x - handle.x;
                const dy1 = startPoint.y - handle.y;
                const dx2 = handle.x - endPoint.x //- handle.x;
                const dy2 = handle.y - endPoint.y //- handle.y;

                let a1 = Math.atan2(dy1, dx1) * 180 / Math.PI
                let a2 = Math.atan2(dy2, dx2) * 180 / Math.PI;

                a1 = Math.abs(a1);

                let entry : "left" | "right" | "down" | "up" = "up";
                let exit : "left" | "right" | "down" | "up" = "left";
    

                let handleX = handle.x;
                let handleY = handle.y;

                if((startPoint.y < handle.y)){
                    entry = "down"
                }else if(startPoint.x < handle.x){
                    entry = "right"
                }else if((startPoint.y > handle.y)){
                    entry = "up"
                }else if(startPoint.x > handle.x ){
                    entry = "left"
                }

                if(endPoint.y < handle.y){
                    exit = "up"
                }else if(endPoint.x > handle.x){
                    exit = "right"
                }else if(endPoint.y > handle.y){
                    exit = "down"
                }else if(endPoint.x < handle.x){
                    exit = "left"
                }

                if((entry == "up" || exit == "down") && (exit == "left" || entry == "right")){
                    angle = 0;
                }else if((entry == "left" || exit == "right") && (exit == "down" || entry == "up")){
                    angle = -90;
                }else if((entry =="left" || exit == "right") && (exit == "up" || exit == "right")){
                    angle = 180;
                }else{
                    angle = 90
                }
            

            }

 
            
      
            angle = find_angle(startPoint, handle, endPoint)

            angle += Math.atan2(startPoint.y - handle.y, startPoint.x - handle.x) * 180 / Math.PI
          

            const offsetX = 7.5
            const offsetY = 7.5

            let x = point.x - 50 + offsetX;
            let y = point.y - offsetY

            const transformX = 50 - offsetX; //+x
            const transformY = offsetY //+y

            let rotation = angle // + 90 % 360 //(point as any).angle;

           


            const onMouseDown = (e: any) => {
                
                let pos : InfiniteCanvasPosition = {
                    x: e.clientX,
                    y: e.clientY
                }

                e.preventDefault()
                e.stopPropagation()

                //  doc = getHostForElement(e.target as HTMLElement);

                const host = e.currentTarget;

                (host as any).setPointerCapture(e.pointerId);

                // let rp = getRelativeCanvasPos?.(pos);// (canvasRef, {offset: _offset, zoom: _zoom}, point)
             
                const mouseMove = (e: MouseEvent) => {
                    let rp = getRelativeCanvasPos?.({x: e.clientX, y: e.clientY})

                    if(rp?.x != undefined || rp?.y != undefined){
                        setPoint({
                            x: rp?.x || 0,
                            y: rp?.y || 0
                        })
                    }
                }

                const mouseUp = (e: any) => {

                    updatePathPoint?.(path.id, ix - 1, { x: e.clientX, y: e.clientY})

                    // props.onPointsChanged?.(ix, {x: e.clientX, y: e.clientY})

                    let target = (e.target as HTMLElement)

                    if(target.hasAttribute('data-nodeid')){

                        let nodeId = target.getAttribute('data-nodeid') || ''
                        let handleId = target.getAttribute('data-handleid') || ''

                        linkPath?.(path.id, nodeId, handleId)
                        // props.onLinked?.(nodeId, handleId)

                    }

                    (host).releasePointerCapture(e.pointerId)

                    host.removeEventListener('pointermove', mouseMove as EventListenerOrEventListenerObject)
                    host.removeEventListener('pointerup', mouseUp as EventListenerOrEventListenerObject)
                }

                host.addEventListener('pointermove', mouseMove as EventListenerOrEventListenerObject)
                host.addEventListener('pointerup', mouseUp as EventListenerOrEventListenerObject)
            }

            return ix < points.length - 1 ? (
                <PipeElbowComponent 
                    transformX={transformX}
                    transformY={transformY}
                    rotation={rotation}
                    x={x}
                    y={y}
                    onMouseDown={onMouseDown}
                    />
            ) : (
                <div 
                    onMouseDown={onMouseDown}
                    style={{
                        position: 'absolute',
                        top: y,
                        left: x,
                        width: 10, 
                        height: 10, 
                        borderRadius: 10,
                        background: 'gray',
                        border: '1px solid black'
                    }}>

                </div>
            )
        },
    }
}