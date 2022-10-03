import { getHostForElement } from "@hexhive/utils";
import React, { useContext } from "react";
import { InfiniteCanvasContext } from "../../../context/context";
import { AbstractPathFactory } from "../../../factories";
import { InfiniteCanvasPosition } from "../../../types";
import { PipeElbow } from "./elbow";
import { PipeSegment } from "./segment";

export const PipePathFactory : AbstractPathFactory = () => {


    const find_angle = (ix: number, a: {x: number, y: number}, b: {x: number, y: number}, c: {x: number, y: number}) => {
        // var ab = { x: b.x - a.x, y: b.y - a.y };
        // var cb = { x: b.x - c.x, y: b.y - c.y };

        // var dot = (ab.x * cb.x + ab.y * cb.y); // dot product
        // var cross = (ab.x * cb.y - ab.y * cb.x); // cross product

        // var alpha = -Math.atan2(cross, dot);
        // if (alpha < 0) alpha += 2 * Math.PI;
        // return alpha;

        let ac = a// a.x < c.x ? a : c;
        let ca = c //a.x < c.x ? c : a;

        let ab1 = Math.atan2(b.y - ac.y, b.x - ac.x) * 180 / Math.PI;
        let ab2 = Math.atan2(b.y - ca.y, b.x - ca.x) * 180 / Math.PI

        return a.x < c.x && ab1 == 180 || ab1 == -90 || (ab1 == 0 && ab2 != 90) ? ab1 : ab1 + 90//a.x <= c.x ? Math.abs(ab2) : Math.abs(ab1);

    }


    const find_angle_new = (A: {x: number, y: number}, B: {x: number, y: number}, C: {x: number, y: number}) => {

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
        // let dotProduct = (A.x * B.x + A.y * B.y);
        // let magnitudeX = Math.sqrt(Math.pow(A.x, 2) + Math.pow(A.y, 2));
        // let magnitudeY = Math.sqrt(Math.pow(B.x, 2) + Math.pow(B.y, 2));

        // let angle = Math.acos((dotProduct) / (magnitudeX * magnitudeY));

        // console.log({angle, dotProduct, magnitudeX, magnitudeY}) 
        // return angle * 180 / Math.PI;
    }
    // const find_angle = (ix: number, A: {x: number, y:number},B: {x: number, y:number},C: {x: number, y:number}) => {

    //     // if()
    //     const AA = Math.atan2(C.y - A.y, C.x - A.x) * 180 / Math.PI
    //     const BB = Math.atan2(B.y - C.y, B.x - C.x) * 180 / Math.PI

    //     console.log({AA});

    //     // console.log({
    //     //     ix,
    //     //     A: Math.atan2(A.y - B.y, A.x - B.x) * 180 / Math.PI,
    //     //     B: Math.atan2(B.y - C.y, B.x - C.x) * 180 / Math.PI,
    //     //     C: AA + BB,
    //     //     D: AA - BB,
    //     //     E: BB - AA
    //     // })
       

    //     var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    //     var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    //     var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));

    //     let angle = ( Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB)) * 180 ) / Math.PI;    
    //     // console.log({angle : angle, anglePow: angle + AA, angleBow: angle + BB, angleCow: angle + AA + BB, angleDow: angle + (AA - BB)})

    //     // angle += (AA-BB)

    //     // if(AA > 0 && BB > 0){
    //     //     angle -= 90;
    //     // }

    //     // return Math.atan((A.y - C.y) / (A.x - C.x)) * 180 / Math.PI;
    //     return {
    //         A: AA,
    //         B: BB
    //     }
    // }

    return {
        type: 'pipe-path',
        renderPathSegment(path, points, setPoints, ix) {
            const { addPathPoint, selectPath } = useContext(InfiniteCanvasContext)

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
                    
                    />
            )
        },
        renderPathPoint(path, point, setPoint, ix) {

            const { points } = path;

            const { linkPath, getRelativeCanvasPos, updatePathPoint } = useContext(InfiniteCanvasContext);

            const startPoint = points[ix - 1]
            let endPoint = points[ix + 1]
            const handle = points[ix]

            const lastStartPoint = points[ix - 2];
            const lastEndPoint = points[ix]
            const lastHandle = points[ix - 1]

            let angle = 0;
            let lastAngle = 0;
            
            // if(lastEndPoint && lastStartPoint){
            //     let dx1 = lastStartPoint.x - lastHandle.x;
            //     let dy1 = lastStartPoint.y - lastHandle.y;

            //     let dx2 = lastEndPoint.x - lastHandle.x;
            //     let dy2 = lastEndPoint.y - lastHandle.y;

            //     let a1 = Math.atan2(dy1, dx1) 
            //     let a2 = Math.atan2(dy2, dx2) 

            //     lastAngle = -find_angle(ix, lastStartPoint, lastHandle, lastEndPoint) // ((a1 - a2) * 180) / Math.PI;
            // }

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
    
// /(a1 > 0 && a1 <= 90)

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
            
                // angle =  find_angle(ix, startPoint, handle, endPoint) //((a1 - a2) * 180) / Math.PI //(((ix % 2 == 0 ? a1 : a2) * 180 / Math.PI) + 360) %360;

            }

 
            // angle = Math.atan2()
            // if(startPoint.y > handle.y){
            //     angle = Math.atan2(handle.y - (startPoint.y), handle.x - (startPoint.x)) * 180 / Math.PI

            // }else if(startPoint.y == handle.y){
            //     angle = Math.atan2(handle.y - (startPoint.y), handle.x - (startPoint.x)) * 180 / Math.PI

            //     if(startPoint.x == handle.x){
            //         angle -= 90
            //     }
            // }else if(startPoint.x == handle.x){
            //     angle = Math.atan2(handle.y - (startPoint.y), handle.x - (startPoint.x)) * 180 / Math.PI

            //      angle -= 90
            // }else{
            //     angle = Math.atan2(handle.y - (endPoint.y ), handle.x - (endPoint.x )) * 180 / Math.PI;

            //     if(startPoint.x != handle.x){
            //         angle += 90;
            //     }
            // }


            // angle = -angle //-(angles[ix - 1 ] || 0) //angle + lastAngle;

            // console.log({angles, ix, angle, location})
            
      
            angle = find_angle_new(startPoint, handle, endPoint)

            angle += Math.atan2(startPoint.y - handle.y, startPoint.x - handle.x) * 180 / Math.PI
            // if(startPoint.x < endPoint.x && startPoint.y < endPoint.y){
            //     angle += 90;
            // }else if(startPoi)

            const offsetX = 7.5
            const offsetY = 7.5

            let x = point.x - 50 + offsetX;
            let y = point.y - offsetY

            const transformX = x + 50 - offsetX;
            const transformY = y + offsetY



            // const isNegative = angle.A < 0 || angle.B < 0;
            // const startsLower = startPoint.y > endPoint.y
            // const movesRight =  handle.x < endPoint.x
            // const startsLeft = handle.x > startPoint.x;

            let rotation = angle // + 90 % 360 //(point as any).angle;

            // if(handle.y <= startPoint.y){
            //     //Handle lower
            // }else{
            //     //Handle higher

            //     if()
            // }
            // if(!isNegative){
            //     rotation = -rotation;
                
            // }else{

            //     if(startsLower && movesRight){
            //         rotation += 180;
            //     }

            //     if(startsLeft && startsLower){
            //         rotation -= 180
            //     }
    
            //     if(!startsLower){
            //         if(movesRight){
            //             rotation += 90;
            //         }else{
            //             rotation -= 90;
            //         }
            //     }

            //     if(startsLeft){
                    
            //     }
            // // }
            
           

            return ix < points.length - 1 ? (
                <PipeElbow 
                    width={50}
                    height={50}
                    x={x}
                    y={y}
                    onMouseDown={(e) => {
                        let pos : InfiniteCanvasPosition = {
                            x: e.clientX,
                            y: e.clientY
                        }
                
                        e.preventDefault()
                        e.stopPropagation()
                
                        // props.onPointsChanged?.(ix, pos)
                
                        let doc = getHostForElement(e.target as HTMLElement)
                
                
                        let rp = getRelativeCanvasPos?.(pos);// (canvasRef, {offset: _offset, zoom: _zoom}, point)
                        // rp = lockToGrid(rp, snapToGrid, grid)
                
                        // let current_path = _paths.current.find((a) => a.id == id)
                
                        // if(!current_path) return;
                        
                        // let updated = updatePathSegment(Object.assign({}, current_path), ix, rp);
                
                        const mouseMove = (e: MouseEvent) => {
                            let rp = getRelativeCanvasPos?.({x: e.clientX, y: e.clientY})
                
                            setPoint({
                                x: rp?.x || 0,
                                y: rp?.y || 0
                            })
                            // let p = points.slice()
                            // p[ix] = {
                            //     x: rp?.x || 0,
                            //     y: rp?.y || 0
                            // }
                            // setPoints(p)
                            // updatePointPosition({x: e.clientX, y: e.clientY})
                        }
                
                        const mouseUp = (e: MouseEvent) => {
                
                            updatePathPoint?.(path.id, ix - 1, { x: e.clientX, y: e.clientY})

                            // props.onPointsChanged?.(ix, {x: e.clientX, y: e.clientY})
                
                            let target = (e.target as HTMLElement)
                            if(target.hasAttribute('data-nodeid')){
                
                                let nodeId = target.getAttribute('data-nodeid') || ''
                                let handleId = target.getAttribute('data-handleid') || ''
                
                                linkPath?.(path.id, nodeId, handleId)
                                // props.onLinked?.(nodeId, handleId)
                
                            }
                
                            doc.removeEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
                            doc.removeEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
                        }
                
                        doc.addEventListener('mousemove', mouseMove as EventListenerOrEventListenerObject)
                        doc.addEventListener('mouseup', mouseUp as EventListenerOrEventListenerObject)
                    }}
                    style={{
                        position: 'absolute',
                        // left: location.x,
                        // top: location.y,
                        width: '50px',
                        height: '50px',
                        transformBox: 'fill-box', 
                        transformOrigin: `${transformX}px ${transformY}px`, 
                        transform: `rotate(${rotation}deg) `
                    }}
                    />
            ) : null
        },
    }
}