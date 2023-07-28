/*
    LightBox

    Handles viewing images and videos, zooming, rotating and galleries
*/

import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LightBoxControl } from "./Controls";

export interface LightBoxProps {
    source?: string

    zoom?: number
    rotation?: number

    onZoom?: (zoom: number) => void
    onRotate?: (rotation: number) => void
}

export const LightBox: React.FC<LightBoxProps> = (props) => {
    // const isGallery = (props.sources || []).length > 1;
    
    const [ zoom, setZoom ] = useState(1);
    const [ rotation, setRotation ] = useState(0);

    useEffect(() => {
        setZoom(props.zoom || 1)
    }, [props.zoom])

    useEffect(() => {
        setRotation(props.rotation || 0)
    }, [props.rotation])

    const onZoom = (value: number) => {
        setZoom(value)
        props.onZoom?.(value);
    }
    
    const onRotate = (value: number) => {
        setRotation(value)
        props.onRotate?.(value)
    }

    return (
        <Paper sx={{ 
            display: 'flex', 
            flex: 1,
            flexDirection: 'column', 
            // border: '1px solid black'
        }}>  
            <LightBoxControl
                onRotate={(r) => onRotate?.((rotation || 0) + r)}
                onZoom={(r) => onZoom?.((zoom || 0) + r)}
                />
            <Box sx={{
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                // alignItems: 'center',
                overflow: 'auto'
            }}>
                <div style={{
                    backgroundImage: `url(${props.source})`,
                    flex: 1,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transform: `scale(${zoom || 1}) rotate(${rotation || 0}deg)`,
                }} />
                {/* <img 
                    src="https://picsum.photos/200" 
                    style={{
                        height: '100%',
                        transform: `scale(${props.zoom || 1}) rotate(${props.rotation || 0}deg)`
                    }} /> */}
            </Box>
        </Paper>
    )  
}