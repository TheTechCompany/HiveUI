import { Box } from "@mui/material";
import React from "react";

export const DataTaskPlaceholder = (props: any) => {
    return (
        <div style={{
            pointerEvents: 'none', 
        }}>
        {/* <Box sx={{
            borderRadius: 7, 
            cursor: 'pointer',
            top: props.top, 
            left: `calc(${props.left}px - 9px)`,
            width: '20px',
            height: '20px', 
            bgcolor: 'gray',
            opacity: '0.4',
            position: 'absolute'
        }}>
        </Box> */}
        <div style={{
            position: 'absolute',
            left: props.left,
            top: 0,
            bottom: 0,
            height: '100%',
            width: '2px',
            opacity: '0.4',
            background: 'gray',
        }} />

        </div>
    )
}