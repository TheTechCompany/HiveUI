import { Box } from "@mui/material"
import React from "react"
export const BackgroundStripe = (props: any) => {
    return (
        <Box 
            sx={{
                background: props.background,
                border: props.border
            }}
            style={{
                position: 'absolute', 
                left: props.left, 
                height: '100%', 
                width: `${props.width}px`
            }}></Box>
    )
}