import React from "react"

import { Box, IconButton } from '@mui/material'
import { FastRewind, PlayArrow, FastForward, Pause } from "@mui/icons-material"
import { useScrubberContext } from "../context"

export const ScrubberControls = (props: any) => {

    const { 
        speed = 0,
        playing,
        rewinding,
        fastForwarding,
        play,
        pause,
        rewind,
        fastForward
    } = useScrubberContext()

    const Controls = [
        {
            icon: FastRewind,
            action: () => {
                rewind?.()
            }
        }, 
        {
            icon: playing || (speed > 0 || speed < 0) ? Pause : PlayArrow,
            action: () => {
                playing || (speed > 0 || speed < 0) ? pause?.() : play?.()
            }
        }, 
        {
            icon: FastForward,
            action: () => {
                fastForward?.()
            }
        }
    ];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
                {Controls.map((X) => (
                    <IconButton 
                        onClick={X.action}
                        size="small">
                        <X.icon sx={{ color: props.color }} fontSize="inherit" />
                    </IconButton>
                ))}
            </Box>
        </Box>
    )
}