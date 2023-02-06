import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

import styles from './styles.scss';


export const useGuides = (boundingBox: {left: number, top: number, width: number, height: number} | undefined, _nodes: InfiniteCanvasNode[], offset: any, zoom: number ) => {


    console.log({boundingBox});

    const [ guides, setGuides ] = useState<{[key: string]: { x: number[], y: number[] }}>({});
    const [ nodes, setNodes ] = useState<{[key: string]: any}>({});

    const [ match, setMatch ] = useState<any>();
    
    const [ active, setActive ] = useState<string>();

    const [ guidesActive, setGuidesActive ] = useState(false);

    const realHeight = useMemo(() => boundingBox && boundingBox?.height * (zoom / 100), [boundingBox, zoom]);
    const realWidth = useMemo(() => boundingBox && boundingBox?.width * (zoom / 100), [boundingBox, zoom]);

    const offsetX = useMemo(() => -(offset.x * (zoom / 100)), [offset])
    const offsetY = useMemo(() => -(offset.y), [offset])

    useEffect(() => {

        if(boundingBox){

        
            // console.log({height: boundingBox.height * (zoom / 100), boundingBox, zoom})

            let guides : any = {};
            let nodes : any = {};

            guides.boundingBox = {
                x: calculateGuidePositions(boundingBox, 'x').map((value) => value - boundingBox.left),
                y: calculateGuidePositions(boundingBox, 'y').map((value) => value - boundingBox.top)
            }

            _nodes.forEach((node, index) => {
                nodes[`box${node.id}`] = Object.assign({}, node, {
                    isHeightZero: !isNaN(Number(node?.height)) ? Math.round((node?.height || 0)) <= 0 : undefined,
            		isWidthZero: !isNaN(Number(node?.width)) ? Math.round((node?.width || 0)) <= 0 : undefined,
                })
                guides[`box${node.id}`] = {
                    x: calculateGuidePositions({left: node.x, top: node.y, width: (node.width || 0), height: (node.height || 0)}, 'x'),
                    y: calculateGuidePositions({left: node.x, top: node.y, width: (node.width || 0), height: (node.height || 0)}, 'y')
                };
            })

            console.log({guides, nodes})

            console.log("IN", {guides})
            setGuides(guides);
            setNodes(nodes)
    
        }

    }, [ JSON.stringify(_nodes) ])



    const guidelines = useMemo(() => {

        let xAxisGuides = null;
		let yAxisGuides = null;

        console.log("GUIDLINES", guides, active, match)

		if (guides) {
			xAxisGuides = Object.keys(guides).reduce((result, box) => {
				const guideClassNames = guidesActive ? `guide xAxis active` : `guide xAxis`;
				let xAxisGuidesForCurrentBox : any = null;
				if (guides[box] && guides[box].x) {
					xAxisGuidesForCurrentBox = guides[box].x.map((position, index) => {
						if (
							active &&
							active === box &&
							match &&
							match.x &&
							match.x.intersection &&
							match.x.intersection === position
						) {
                            // 
							return <Guideline key={`x-${box}-${position}-${index}`}  height={realHeight} className={guideClassNames} top={offsetY} left={position} style={{ left: position, height: 5, background: 'blue' }} />;
						} else {
							return null;
						}
					});
				}

				return result.concat(xAxisGuidesForCurrentBox);
			}, []);

			yAxisGuides = Object.keys(guides).reduce((result, box) => {
				const guideClassNames = guidesActive ? `guide yAxis active` : `guide yAxis`;
				let yAxisGuidesForCurrentBox : any = null;
				if (guides[box] && guides[box].y) {
					yAxisGuidesForCurrentBox = guides[box].y.map((position, index) => {
                        console.log({match, active, box, position})

						if (
							active &&
							active === box &&
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

        console.log("INSIDE", {  xAxisGuides: xAxisGuides?.filter((a) => a != null), yAxisGuides: yAxisGuides?.filter((a) => a != null) })


        return {xAxisGuides, yAxisGuides}

    }, [ JSON.stringify(guides), JSON.stringify(nodes), JSON.stringify(match), offset, zoom ])


    console.log({active});

    const dragHandler = useCallback((data: any) => {
        let newData: any;
        console.log("DRAG HANDLER 1")

        if(active){
            let boxes = Object.assign({}, nodes, {
                [active]: Object.assign({}, nodes[active], {
                    ...nodes[active],
                    x: data.x,
                    y: data.y,
                    // left: data.left,
                    // top: data.top,
                    // width: data.width,
                    // height: data.height,
                    // deltaX: data.deltaX,
                    // deltaY: data.deltaY,
                })
            });

            let newGuides = Object.assign({}, guides, {
                [active]: Object.assign({}, guides[active], {
                    x: calculateGuidePositions(boxes[active], 'x'),
                    y: calculateGuidePositions(boxes[active], 'y')
                })
            });

            setNodes(boxes)
            setGuides(newGuides)
        }

        if(active){
    

            const match = proximityListener(active, guides)
            console.log("DRAG HANDLER 2", {match})

            let newActiveBoxLeft = nodes[active].left;
            let newActiveBoxTop = nodes[active].top;
                
            for (let axis in match) {

				const { activeBoxGuides, matchedArray, proximity } = match[axis];
				const activeBoxProximityIndex = proximity.activeBoxIndex;
				const matchedBoxProximityIndex = proximity.matchedBoxIndex;

					if (axis === 'x') {
						if (activeBoxGuides[activeBoxProximityIndex] > matchedArray[matchedBoxProximityIndex]) {
							newActiveBoxLeft = nodes[active].left - proximity.value;
						} else {
							newActiveBoxLeft = nodes[active].left + proximity.value;
						}
					} else {
						if (activeBoxGuides[activeBoxProximityIndex] > matchedArray[matchedBoxProximityIndex]) {
							newActiveBoxTop = nodes[active].top - proximity.value;
						} else {
							newActiveBoxTop = nodes[active].top + proximity.value;
						}
					}
				}
                
				const boxes = Object.assign({}, nodes, {
					[active]: Object.assign({}, nodes[active], {
						left: newActiveBoxLeft,
						top: newActiveBoxTop
					})
				});
				const newGuides = Object.assign({}, guides, {
					[active]: Object.assign({}, guides[active], {
						x: calculateGuidePositions(nodes[active], 'x'),
						y: calculateGuidePositions(nodes[active], 'y')
					})
				})

				const activeBox = {
					left: nodes[active].left,
					top: nodes[active].top,
					x: nodes[active]?.x || 0,
					y: nodes[active]?.y || 0,
				}

				Object.keys(newGuides).map(box => {
					newGuides?.[box]?.x?.map((position: number) => {
						if (match?.x?.intersection === position) {
							activeBox.left = newActiveBoxLeft;
							activeBox.x = newActiveBoxLeft;
						}
					});

					newGuides?.[box]?.y?.map((position: number) => {
						if (match?.y?.intersection === position) {
							activeBox.top = newActiveBoxTop;
							activeBox.y = newActiveBoxTop;
						}
					});
				});

				newData = Object.assign({}, newData, {
					// calculating starting position: (newData.x - newData.deltaX) for snapped delta
					deltaX: activeBox?.x - (newData?.x - newData?.deltaX) || 0,
					deltaY: activeBox?.y - (newData?.y - newData?.deltaY) || 0,
					...activeBox
				});

				const newBoxes = Object.assign({}, nodes, {
					[active] : Object.assign({}, nodes[active], {
						...activeBox,
						deltaX: newData.deltaX,
						deltaY: newData.deltaY,
					})
				});
				
                setNodes(newBoxes)
                setGuides(newGuides)
                
                console.log({match})

                setMatch(match)


				// this.setState({
				// 	boxes: newBoxes,
				// 	guides,
				// 	match,
				// 	activeBoxSnappedPosition: Object.assign({}, {
				// 		deltaX: activeBox?.x - (newData?.x - newData.deltaX),
				// 		deltaY: activeBox?.y - (newData?.y - newData.deltaY),
				// 		...activeBox
				// 	})
				// });
        }
    }, [active, guides, nodes])
    // const addGuidelinesForSnapping = (guides) => {
    //     const xFactor = props.xFactor || 1;
    //     const yFactor = props.yFactor || 1
    //     const userXGuidesPos = this.props.userXGuides

    //     ? Object.keys(this.props.userXGuides).map((guideId) =>
    //                 Math.round(this.props.userXGuides[guideId] / xFactor)
    //             )
    //         : []
    //     const userYGuidesPos = this.props.userYGuides
    //         ? Object.keys(this.props.userYGuides).map((guideId) =>
    //                 Math.round(this.props.userYGuides[guideId] / yFactor)
    //             )
    //         : []

    //     guides.userGuides = {
    //         x: userXGuidesPos.sort((x, y) => x - y),
    //         y: userYGuidesPos.sort((x, y) => x - y),
    //     }
    // }

    return {
        nodes,
        guides,
        guidelines,
        dragHandler,
        active,
        setActive
    }
}