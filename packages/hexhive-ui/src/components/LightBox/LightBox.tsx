/*
    LightBox

    Handles viewing images and videos, zooming, rotating and galleries
*/

import { Box } from "@mui/material";
import React from "react";
import { LightBoxControl } from "./Controls";

export interface LightBoxProps {
    sources?: string[]

    zoom?: number
    rotation?: number

    onZoom?: (zoom: number) => void
    onRotate?: (rotation: number) => void
}

export const LightBox: React.FC<LightBoxProps> = (props) => {
    const isGallery = (props.sources || []).length > 1;
    
    return (
        <Box sx={{ 
            display: 'flex', 
            flex: 1,
            flexDirection: 'column', 
            border: '1px solid black'
        }}>  
            <LightBoxControl
                onRotate={(r) => props.onRotate?.((props.rotation || 0) + r)}
                onZoom={(r) => props.onZoom?.((props.zoom || 0) + r)}
                />
            <Box sx={{
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <img 
                    src="https://picsum.photos/200" 
                    style={{
                        height: '100%',
                        transform: `scale(${props.zoom || 1}) rotate(${props.rotation || 0}deg)`
                    }} />
            </Box>
        </Box>
    )  
}