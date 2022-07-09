import { RotateLeft, RotateRight, ZoomIn, ZoomOut } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

export interface LightBoxControlProps {
    onZoom?: (zoom: number) => void;
    onRotate?: (rotation: number) => void;
}

export const LightBoxControl : React.FC<LightBoxControlProps> = (props) => {
    return (
        <Box sx={{bgcolor: 'primary.dark', display: 'flex', justifyContent: 'flex-end'}}>
            <IconButton
                onClick={() => props.onZoom?.(0.5)}
                sx={{color: 'white'}}>
                <ZoomIn />
            </IconButton>
            <IconButton 
                onClick={() => props.onZoom?.(-0.5)}
                sx={{color: 'white'}}>
                <ZoomOut />
            </IconButton>
            <IconButton 
                onClick={() => props.onRotate?.(-90)}
                sx={{color: 'white'}}>
                <RotateLeft />
            </IconButton>
            <IconButton
                onClick={() => props.onRotate?.(-90)}
                sx={{color: 'white'}}>
                <RotateRight />
            </IconButton>
        </Box>
    )
}