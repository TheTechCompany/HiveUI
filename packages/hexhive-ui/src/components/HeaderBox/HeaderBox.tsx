import { Box, Paper } from "@mui/material"
import React from "react"

export interface HeaderBoxProps {
    header: JSX.Element
}

export const HeaderBox : React.FC<HeaderBoxProps> = (props) => {
    return (
        <Paper
            sx={{flex: 1, display: 'flex', flexDirection: 'column'}} >
            <Box sx={{padding: '6px', bgcolor: 'secondary.main'}} >
                {props.header}
            </Box>
            <Box sx={{flex: 1}}>
                {props.children}
            </Box>
        </Paper>
    )
}