import React, { useContext, useEffect, useRef } from 'react';
import { InfiniteCanvasContext } from '../context/context';

export interface GridLayerProps {
}

const DIVISION = 3;

export const GridLayer: React.FC<GridLayerProps> = (props) => {

    const {
        zoom, 
        offset, 
        darkMode,
        snapToGrid,
        grid,
        style
    } = useContext(InfiniteCanvasContext)

    const lineColor =  {
        dark: style?.lineColor || "#131c20",
        light: "#dfdfdf"
    }

    const bgColor = {
        dark: style?.background || 'rgb(42, 42, 42)',
        light: 'white'
    }
    

    const backgroundColor = darkMode ? bgColor.dark : bgColor.light
    const lineColors = darkMode ? lineColor.dark : lineColor.light

    const svgRef = useRef<SVGSVGElement>(null);

    const renderHorizontal = () => {
        let horiz = []
        const w = (grid || {width: 100}).width / (grid?.divisions || 10)
        for (var i = 0; i < (grid?.divisions || 10); i++) {
            horiz.push(<circle cx={i*w} cy={i*w} r={1}/>)
            // horiz.push(<line strokeDasharray={'2 8'} stroke={lineColors} x1='0' x2="100" y1={`${i * w}`} y2={`${i * w}`} />)
        }
        return horiz;
    }

    const renderVertical = () => {
        let vert = [];
     
        const h = (grid || {height: 100}).height / (grid?.divisions || 10)

        for (var i = 0; i < (grid?.divisions || 10); i++) {
            vert.push(<circle cx={i*h} cy={i*h}  r={1} />)
            // vert.push(<line strokeDasharray={'2 8'} stroke={lineColors} x1={`${i *  h}`} x2={`${i * h}`} y1="0" y2="100" />)
        }
        return vert;
    }

    const renderDots = () => {
        let dots = [];

        const divisions = grid?.divisions || 10

        const w = (grid || {width: 100}).width / (grid?.divisions || 10)
        const h = (grid || {height: 100}).height / (grid?.divisions || 10)

        for(var x = 0; x < divisions + 1; x++){
            for(var y = 0; y < divisions + 1; y++){
                dots.push(<circle overflow={'visible'} cx={x  * w} cy={y*h} r={1} />)
            }
        }

        return dots;
    }

    useEffect(() => {

    }, [])

    const scaledTile = 100 * zoom;

    const offsetX = offset.x % scaledTile
    const offsetY = offset.y % scaledTile

    return (
        <svg 
            overflow={'visible'}
            ref={svgRef} style={{flex: 1, backgroundColor: backgroundColor}}>
            <defs>
                <pattern overflow={"visible"} patternUnits="userSpaceOnUse" width={grid?.width || "100"} height={grid?.height || "100"} viewBox="0 0 100 100" id="cells">
                    {/* <rect x="0" y="0" width={grid?.width || "100"} height={grid?.height || "100"} fill="none" style={{strokeWidth: 1, stroke: lineColors}}></rect> */}
                    {renderDots()}
                    {/* {renderHorizontal()}
                    {renderVertical()} */}
                </pattern>
                <pattern overflow={"visible"}  patternUnits="userSpaceOnUse" width={scaledTile} height={scaledTile} viewBox={`0 0 ${scaledTile} ${scaledTile}`} id="cell-rect">
                    <rect 
                        x="-100" 
                        y="-100" 
                        width="300" 
                        height="300" 
                        overflow={'visible'}
                        style={{
                            fill: "url(#cells)",
                            transformOrigin: '0 0',
                            transform: `matrix(${zoom}, 0, 0, ${zoom}, ${offsetX}, ${offsetY})`
                        }}>

                    </rect>
                </pattern>
            </defs>

            <rect overflow={'visible'} height="100%" width="100%" fill="url(#cell-rect)" />
        </svg>
    )
}