import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InfiniteCanvasNode } from '../../types';

import {
    calculateGuidePositions,
    getMultipleSelectionCoordinates,
    getOffsetCoordinates,
    proximityListener,
    getGroupCoordinates,
    checkGroupChildElementsLocked
} from '../../utils/guides'
import { Guideline } from './guideline';


// export const useGuidelines = (
//     nodes: InfiniteCanvasNode[],
//     options: {boundingBox: {width: number, height: number}, zoom: number, offset: {x: number, y: number} }
// ) => {

//     const { boundingBox, zoom, offset } = options;

//     const realHeight = useMemo(() => boundingBox && boundingBox?.height * (zoom / 100), [boundingBox, zoom]);
//     const realWidth = useMemo(() => boundingBox && boundingBox?.width * (zoom / 100), [boundingBox, zoom]);

//     const offsetX = useMemo(() => parseInt((-(offset.x * (zoom / 100))).toString()), [offset])
//     const offsetY = useMemo(() => -(offset.y), [offset])


//     const active = useRef<{ value: string | null }>({ value: null });

//     const [guidesActive, setGuidesActive] = useState(false);

//     const guides = useMemo(() => {
//         let guides : {[key: string]: {x?: number[], y?: number[]}} = {}
//         nodes?.forEach((box) => {
//             guides[`${box.id}`] = {
//                 x: calculateGuidePositions({ left: box.x, top: box.y, width: (box.width || 0), height: (box.height || 0) }, 'x'),
//                 y: calculateGuidePositions({ left: box.x, top: box.y, width: (box.width || 0), height: (box.height || 0) }, 'y')
//             };
//         });
//         return guides;
//     }, [nodes])

//     const match = useMemo(() => guides && proximityListener(active.current.value, guides), [guides, active])

//     const guidelines = useMemo(() => {

//         let xAxisGuides = null;
//         let yAxisGuides = null;

//         if (guides) {
//             xAxisGuides = Object.keys(guides).reduce((result, box) => {
//                 const guideClassNames = guidesActive ? `guide xAxis active` : `guide xAxis`;
//                 let xAxisGuidesForCurrentBox: any = null;
//                 if (guides[box] && guides[box].x) {
//                     xAxisGuidesForCurrentBox = guides[box].x?.map((position, index) => {

//                         if (
//                             active.current &&
//                             active.current.value === box &&
//                             match &&
//                             match.x &&
//                             match.x.intersection &&
//                             match.x.intersection === position
//                         ) {
//                             // 
//                             return <Guideline variant="vertical" key={`x-${box}-${position}-${index}`} height={realHeight} className={guideClassNames} top={offsetY} left={position} style={{ left: position, height: 5, background: 'blue' }} />;
//                         } else {
//                             return null;
//                         }
//                     });
//                 }

//                 return result.concat(xAxisGuidesForCurrentBox);
//             }, []);

//             yAxisGuides = Object.keys(guides).reduce((result, box) => {
//                 const guideClassNames = guidesActive ? `guide yAxis active` : `guide yAxis`;
//                 let yAxisGuidesForCurrentBox: any = null;
//                 if (guides[box] && guides[box].y) {
//                     yAxisGuidesForCurrentBox = guides[box].y?.map((position, index) => {

//                         if (
//                             active &&
//                             active.current?.value === box &&
//                             match &&
//                             match.y &&
//                             match.y.intersection &&
//                             match.y.intersection === position
//                         ) {

//                             return <Guideline key={`y-${box}-${position}-${index}`} className={guideClassNames} width={realWidth} left={offsetX} top={position} style={{ top: position, height: 5, background: 'blue' }} />

//                         } else {
//                             return null;
//                         }
//                     });
//                 }

//                 return result.concat(yAxisGuidesForCurrentBox);
//             }, []);
//         }

//         return { xAxisGuides, yAxisGuides }

//     }, [JSON.stringify(guides), JSON.stringify(nodes), JSON.stringify(match), offset, zoom])



//     return {guides, guidelines}
// }

export const useGuides = (options: {
    xFactor?: number,
    yFactor?: number,
    userXGuides?: any,
    userYGuides?: any,
    boundingBox: { left: number, top: number, width: number, height: number } | undefined,

    boxes: InfiniteCanvasNode[],
    onSnap?: (box: string, position: {x: number, y: number}) => void;
    offset: any,
    zoom: number
}) => {

    
    const [activeBoxes, setActiveBoxes] = useState<any[]>([]);

    const [guides, setGuides] = useState<{ [key: string]: { x: number[], y: number[] } }>({});

    // const [boxes, _setBoxes] = useState<any[] | null>(null);
    const boxes = options.boxes;

    const [guidesActive, setGuidesActive] = useState(false);

    // const [ nodes, setNodes ] = useState<{[key: string]: any}>({});

    const [match, setMatch] = useState<any>();

    const active = useRef<{ value: string | null }>({ value: null });


    const [activeBoxSnappedPosition, setActiveBoxSnappedPosition] = useState<any>({});

    const { boundingBox, zoom, offset } = options;

    const realHeight = useMemo(() => boundingBox && boundingBox?.height * (zoom / 100), [boundingBox, zoom]);
    const realWidth = useMemo(() => boundingBox && boundingBox?.width * (zoom / 100), [boundingBox, zoom]);

    const offsetX = useMemo(() => parseInt((-(offset.x * (zoom / 100))).toString()), [offset])
    const offsetY = useMemo(() => -(offset.y), [offset])




   
    //Set up everything
    // useEffect(() => {
    //     // Set the dimensions of the bounding box and the draggable boxes when the component mounts.
    //     if (options.boundingBox) {
    //         const boundingBox = options.boundingBox
    //         const boxes : any = {};
    //         const guides : any = {};
    //         const activeBoxes : any[] = [];
    //         let active = '';
    //         const captionGroupsToIndexMap = {};

    //         // Adding the guides for the bounding box to the guides object
    //         guides.boundingBox = {
    //             x: calculateGuidePositions(boundingBox, 'x').map(value => value - boundingBox.left),
    //             y: calculateGuidePositions(boundingBox, 'y').map(value => value - boundingBox.top)
    //         };

    //         options.boxes.forEach((dimensions, index) => {
    //             boxes[`${dimensions.id}`] = Object.assign({}, dimensions, {
    //                 isHeightZero: !isNaN(Number(dimensions?.height)) ? Math.round(dimensions?.height || 0) <= 0 : undefined,
    //                 isWidthZero: !isNaN(Number(dimensions?.width)) ? Math.round(dimensions?.width || 0) <= 0 : undefined,
    //             });

    //             guides[`${dimensions.id}`] = {
    //                 x: calculateGuidePositions({ left: dimensions.x, top: dimensions.y, width: (dimensions.width || 0), height: (dimensions.height || 0) }, 'x'),
    //                 y: calculateGuidePositions({ left: dimensions.x, top: dimensions.y, width: (dimensions.width || 0), height: (dimensions.height || 0) }, 'y')
    //             };

    //             if(active === dimensions.id){
    //                 activeBoxes.push(`${dimensions.id}`);
    //             }
    //             // if (dimensions.active) {
    //             //     activeBoxes.push(`box${index}`);
    //             // }

    //             // if (dimensions?.metadata?.url) {
    //             //     const img = new Image();
    //             //     img.src = dimensions.metadata.url;
    //             // }

    //         });

    //         if (activeBoxes.length > 1) {
    //             boxes['box-ms'] = getMultipleSelectionCoordinates(boxes, activeBoxes);
    //             boxes['box-ms'].type = 'group';
    //             boxes['box-ms'].zIndex = 12;
    //             const selections = [];
    //             for (let box in boxes) {
    //                 if (boxes.hasOwnProperty(box) && activeBoxes.includes(box)) {
    //                     selections.push(boxes[box]);
    //                 }
    //             }

    //             boxes['box-ms'].selections = selections;
    //             active = 'box-ms';
    //         } else 

    //         if (activeBoxes.length === 1) {
    //             active = activeBoxes[0];
    //         }
    //         // Checking if Groups are present and if the length of array of group > 0 then we create grouped boxes.
    //         // if (this.props?.groups?.length > 0) {
    //         //     // for each group we are creating a new box starting with 'box-ms-'
    //         //     this.props.groups.forEach((groupArray, index) => {
    //         //         boxes[`${GROUP_BOX_PREFIX}${index}`] = getGroupCoordinates(boxes, groupArray);
    //         //         boxes[`${GROUP_BOX_PREFIX}${index}`].type = 'group';
    //         //         boxes[`${GROUP_BOX_PREFIX}${index}`].zIndex = 12;
    //         //         const selections = [];
    //         //         const selectedIndexes = [];
    //         //         let allElementsInsideGroupAreSelected = true;
    //         //         // Checking for all the boxes present inside that group and storing them in selections
    //         //         for (let box in boxes) {
    //         //             if (boxes.hasOwnProperty(box) && groupArray.includes(boxes?.[box]?.metadata?.captionIndex)) {
    //         //                 selections.push(boxes[box]);
    //         //                 selectedIndexes.push(box);
    //         //                 if (boxes[box].active !== true) {
    //         //                     allElementsInsideGroupAreSelected = false;
    //         //                 }
    //         //             }
    //         //         }
    //         //         if (allElementsInsideGroupAreSelected) {
    //         //             selectedIndexes.forEach(val => {
    //         //                 activeBoxes.splice(activeBoxes.indexOf(val), 1);
    //         //             });
    //         //             activeBoxes.push(`${GROUP_BOX_PREFIX}${index}`);
    //         //         }
    //         //         boxes[`${GROUP_BOX_PREFIX}${index}`].metadata = {type:'group'};
    //         //         boxes[`${GROUP_BOX_PREFIX}${index}`].selections = selections;
    //         //         boxes[`${GROUP_BOX_PREFIX}${index}`].identifier = `${GROUP_BOX_PREFIX}${index}`;
    //         //         boxes[`${GROUP_BOX_PREFIX}${index}`].isLayerLocked = checkGroupChildElementsLocked(selections);
    //         //         // storing all the indexes inside a particular group to map it later if we need
    //         //         captionGroupsToIndexMap[`${GROUP_BOX_PREFIX}${index}`] = groupArray;
    //         //         // active = `box-ms-${index}`;
    //         //     });
    //         //     delete boxes['box-ms'];
    //         // }

    //         if (activeBoxes.length > 1) {
    //             boxes['box-ms'] = getMultipleSelectionCoordinates(boxes, activeBoxes);
    //             boxes['box-ms'].type = 'group';
    //             boxes['box-ms'].zIndex = 12;
    //             const selections = [];
    //             for (let box in boxes) {
    //                 if (boxes.hasOwnProperty(box) && activeBoxes.includes(box)) {
    //                     selections.push(boxes[box]);
    //                 }
    //             }

    //             boxes['box-ms'].selections = selections;
    //             active = 'box-ms';
    //         } else if (activeBoxes.length === 1) {
    //             active = activeBoxes[0];
    //         }

    //         // adding guidelines for snapping
    //         addGuidelinesForSnapping(guides);

    //         // document.addEventListener('click', this.unSelectBox);
    //         // window.addEventListener('blur', this.unSelectBox);
    //         // document.addEventListener('keydown', this.setShiftKeyState);
    //         // document.addEventListener('keydown', this.unSelectBox);
    //         // document.addEventListener('keyup', this.setShiftKeyState);
    //         // document.addEventListener('contextmenu', this.selectBox);

    //         setGuides(guides);
    //         setActiveBoxes(activeBoxes);
    //         // setActive()

    //         // this.setState({
    //         //     boundingBox,
    //         //     boxes,
    //         //     guides,
    //         //     activeBoxes,
    //         //     active,
    //         //     captionGroupsToIndexMap,
    //         // });
    //     }

    // // if (this.props.isStylingPanelEnabled) {
    // //     this.mouseDragHandler();
    // // }

    // }, [JSON.stringify(options.boxes)])

    useEffect(() => {
        setGuides((guides) => {
            boxes?.forEach((dimensions) => {
                guides[`${dimensions.id}`] = {
                    x: calculateGuidePositions({ left: dimensions.x, top: dimensions.y, width: (dimensions.width || 0), height: (dimensions.height || 0) }, 'x'),
                    y: calculateGuidePositions({ left: dimensions.x, top: dimensions.y, width: (dimensions.width || 0), height: (dimensions.height || 0) }, 'y')
                };
            });
            return guides;
        })

    }, [boxes])

    //Update com
    // useEffect(() => {

    //     if (activeBoxes.length > 0) {
    //         const activeBoxWithoutLock = activeBoxes.filter(activeBox => {
    //             return !boxes?.find((a) => a.id == activeBox) || !boxes?.find((a) => a.id == activeBox).isLayerLocked;
    //         });
    //         if (JSON.stringify(activeBoxes) !== JSON.stringify(activeBoxWithoutLock)) {
    //             setActiveBoxes(activeBoxWithoutLock)
    //             // this.setState({
    //             // 	activeBoxes: activeBoxWithoutLock
    //             // });
    //         }
    //     }





    //     // // adding user guides for snapping
    //     // if (
    //     // 	this.props.xFactor !== prevProps.xFactor ||
    //     // 	this.props.yFactor !== prevProps.yFactor ||
    //     // 	this.props.userXGuides !== prevProps.userXGuides ||
    //     // 	this.props.userYGuides !== prevProps.userYGuides
    //     // ) {
    //     // 	// const guides = this.state.guides
    //     // 	addGuidelinesForSnapping(guides)
    //     // 	// this.setState({
    //     // 	// 	guides,
    //     // 	// })
    //     // }
    // }, [boxes, activeBoxes])



    const guidelines = useMemo(() => {

        let xAxisGuides = null;
        let yAxisGuides = null;

        if (guides) {
            xAxisGuides = Object.keys(guides).reduce((result, box) => {
                const guideClassNames = guidesActive ? `guide xAxis active` : `guide xAxis`;
                let xAxisGuidesForCurrentBox: any = null;
                if (guides[box] && guides[box].x) {
                    xAxisGuidesForCurrentBox = guides[box].x.map((position, index) => {

                        if (
                            active.current &&
                            active.current.value === box &&
                            match &&
                            match.x &&
                            match.x.intersection &&
                            match.x.intersection === position
                        ) {
                            // 
                            return <Guideline variant="vertical" key={`x-${box}-${position}-${index}`} height={realHeight} className={guideClassNames} top={offsetY} left={position} style={{ left: position, height: 5, background: 'blue' }} />;
                        } else {
                            return null;
                        }
                    });
                }

                return result.concat(xAxisGuidesForCurrentBox);
            }, []);

            yAxisGuides = Object.keys(guides).reduce((result, box) => {
                const guideClassNames = guidesActive ? `guide yAxis active` : `guide yAxis`;
                let yAxisGuidesForCurrentBox: any = null;
                if (guides[box] && guides[box].y) {
                    yAxisGuidesForCurrentBox = guides[box].y.map((position, index) => {

                        if (
                            active &&
                            active.current?.value === box &&
                            match &&
                            match.y &&
                            match.y.intersection &&
                            match.y.intersection === position
                        ) {

                            return <Guideline key={`y-${box}-${position}-${index}`} className={guideClassNames} width={realWidth} left={offsetX} top={position} style={{ top: position, height: 5, background: 'blue' }} />

                        } else {
                            return null;
                        }
                    });
                }

                return result.concat(yAxisGuidesForCurrentBox);
            }, []);
        }

        return { xAxisGuides, yAxisGuides }

    }, [JSON.stringify(guides), JSON.stringify(boxes), JSON.stringify(match), offset, zoom])


    const dragStart = (data: any) => {
        active.current.value = `${data.id}`;
        // setActive(data.id)

        setActiveBoxes([`${data.id}`])

    }

    const dragHandler = useCallback((data: any) => {
        let newData: any;

        // if(active){


        //     let boxes = _nodes.slice();
        //     let ix = boxes.findIndex((a) => a.id == active);
        //     boxes[ix] = {
        //         ...boxes[ix],
        //         x: data.x,
        //         y: data.y,
        //     }

        //     setNodes(boxes)

        //     let box = boxes.find((a) => a.id == active);
        //     if(box){
        //         let newGuides = Object.assign({}, guides, {
        //             [active]: Object.assign({}, guides[active], {
        //                 x: calculateGuidePositions({left: box.x, top: box.y, width: (box.width || 0), height: (box.height || 0)}, 'x'),
        //                 y: calculateGuidePositions({left: box.x, top: box.y, width: (box.width || 0), height: (box.height || 0)}, 'y')
        //             })
        //         });
        //         setGuides(newGuides)
        //     }

        // }

        if (active.current.value) {


            const match = proximityListener(active.current.value, guides)

            setMatch(match);

            let newActiveBoxLeft = boxes?.find((a) => a.id == active.current.value)?.x;
            let newActiveBoxTop = boxes?.find((a) => a.id == active.current.value)?.y;

            // console.log({newActiveBoxLeft, newActiveBoxTop})

            // for (let axis in match) {

            //     const { activeBoxGuides, matchedArray, proximity } = match[axis];
            //     const activeBoxProximityIndex = proximity.activeBoxIndex;
            //     const matchedBoxProximityIndex = proximity.matchedBoxIndex;

            //     console.log("Adjust axis", axis, activeBoxGuides[activeBoxProximityIndex], matchedArray[matchedBoxProximityIndex], proximity.value ) 
            //     if (axis === 'x') {
            //         if (activeBoxGuides[activeBoxProximityIndex] > matchedArray[matchedBoxProximityIndex]) {
            //             newActiveBoxLeft = (boxes?.find((a) => a.id == active.current.value)?.x || 0) - proximity.value;
            //         } else {
            //             newActiveBoxLeft = (boxes?.find((a) => a.id == active.current.value)?.x || 0) + proximity.value;
            //         }
            //     } else {
            //         if (activeBoxGuides[activeBoxProximityIndex] > matchedArray[matchedBoxProximityIndex]) {
            //             newActiveBoxTop = (boxes?.find((a) => a.id == active.current.value)?.y || 0) - proximity.value;
            //         } else {
            //             newActiveBoxTop = (boxes?.find((a) => a.id == active.current.value)?.y || 0) + proximity.value;
            //         }
            //     }
            // }

            // console.log({newActiveBoxLeft, newActiveBoxTop})

            // if(newActiveBoxLeft && newActiveBoxTop && match && (match.x || match.y) && match.proximity != 0) options.onSnap?.(active.current.value, {x: newActiveBoxLeft, y: newActiveBoxTop})

            let active_box = options.boxes.find((a) => a.id == active.current.value) || {} as any

            //Assign newActiveBoxLeft 
            const _boxes = Object.assign({}, active_box, {
                    left: newActiveBoxLeft || 0,
                    top: newActiveBoxTop || 0,
                    x: newActiveBoxLeft || 0,
                    y: newActiveBoxTop || 0,
                    width: active_box?.width || 0 ,
                    height: active_box?.height || 0

            });


            //Recalculate guides
            const _guides = Object.assign({}, guides, {
                [active.current.value]: Object.assign({}, guides[active.current.value], {
                    x: calculateGuidePositions(_boxes, 'x'),
                    y: calculateGuidePositions(_boxes, 'y')
                })
            })

            // //Create activeBox
            // const activeBox = {
            //     left: this.state.boxes[this.state.active].left,
            //     top: this.state.boxes[this.state.active].top,
            //     x: this.state.boxes[this.state.active]?.x || 0,
            //     y: this.state.boxes[this.state.active]?.y || 0,
            // }

            let new_box : any = {};

            Object.keys(_guides).map(box => {
                _guides?.[box]?.x.map(position => {
                    if (match?.x?.intersection === position && new_box.x != newActiveBoxLeft) {
                        new_box.left = newActiveBoxLeft;
                        new_box.x = newActiveBoxLeft;
                    }
                });

                _guides?.[box]?.y.map(position => {
                    if (match?.y?.intersection === position && new_box.y != newActiveBoxTop) {
                        new_box.top = newActiveBoxTop;
                        new_box.y = newActiveBoxTop;
                    }
                });
            });

     
            if(Object.keys(new_box).length > 0 && (match?.x?.proximity?.value > 0 || match?.y?.proximity?.value > 0) ) {
                // options.onSnap?.(active.current.value, new_box)
            }

        }


    }, [active.current,  guides, boxes])

    const addGuidelinesForSnapping = (guides: any) => {
        const xFactor = options.xFactor || 1;
        const yFactor = options.yFactor || 1

        const userXGuidesPos = options.userXGuides

            ? Object.keys(options.userXGuides).map((guideId) =>
                Math.round(options.userXGuides[guideId] / xFactor)
            )
            : []
        const userYGuidesPos = options.userYGuides
            ? Object.keys(options.userYGuides).map((guideId) =>
                Math.round(options.userYGuides[guideId] / yFactor)
            )
            : []

        guides.userGuides = {
            x: userXGuidesPos.sort((x, y) => x - y),
            y: userYGuidesPos.sort((x, y) => x - y),
        }
    }

    return {
        // _nodes: Object.keys(nodes).map((x) => nodes[x]),
        boxes,
        guides,
        guidelines,
        dragStart,
        dragHandler,
        active
        // setActive
    }
}