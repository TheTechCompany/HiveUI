import React from 'react';
import { Box, Paper, Typography, Popover } from "@mui/material";
import { useState } from "react";
import { Content } from "./content";
import { Footer } from "./footer";
import { Header } from "./header";
import { ScheduleItem } from '../types';

export interface ScheduleCardProps {
    data: ScheduleItem;
    onMove?: (dir: number) => void;
    onClick?: () => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ data, onMove, onClick }) => {
    const [hoverEl, setHoverEl] = useState<any>()

    const moveDown = () => {
        if (onMove) onMove(1)
    }

    const moveUp = () => {
        if (onMove) onMove(-1);
    }


    const hoverStart = (e: any) => {
        setHoverEl(e.currentTarget)

        //      this.setState({hovering: state})
    }

    const hoverEnd = (e: any) => {
        setHoverEl(null)
    }

    const isEmpty = () => {
        return !((data?.people && data?.people.length > 0) || (data?.equipment && data?.equipment.length > 0))
    }
    return (
        <Paper
            sx={{display: 'flex', flex: 1}}>

            <Popover
                // enterExitTransitionDurationMs={300}
                open={(data?.notes || []).length > 0 && hoverEl != null}
                anchorEl={hoverEl}
                // preferPlace={"right"}
            >
               
                    <Box >
                        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>{data.notes?.map((x) => (<li>{x}</li>))}</ul>
                    </Box>
            </Popover>
                <Box
                    sx={{display: 'flex', flexDirection: 'column', flex: 1}}
                    aria-owns={hoverEl != null ? 'mouse-over-notes' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={hoverStart}
                    onMouseLeave={hoverEnd}
                    className="schedule-card" >

                    <Header
                        moveUp={moveUp}
                        moveDown={moveDown}
                        data={data} />

                    <Box
                        
                        style={{ paddingBottom: (isEmpty() ? '4px' : undefined), position: 'relative' }} onClick={onClick}>
                        <Typography 
                            textAlign="center"
                            fontSize="small" 
                            fontWeight="bold" 
                            className="card-title" >{data?.project.name}</Typography>
                        <Content
                            users={data.managers || []}
                            data={data} />
                    </Box>
                    <Footer
                        data={data} />
                </Box>
        </Paper>
    );
}