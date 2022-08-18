import { Box, Typography } from '@mui/material'
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import useResizeAware from 'react-resize-aware';

export interface InfiniteScrubberProps {
    time: number;    
    onTimeChange?: (time: number) => void;

    style?: {
        backgroundColor?: string;
        textColor?: string;
    }
}

export const InfiniteScrubber : React.FC<InfiniteScrubberProps> = (props) => {

    const [resizeListener, sizes] = useResizeAware();

    const day = moment(new Date(props.time)).format('DD/MM')
    const [ offset, setOffset ] = useState<number>(0);

    const WIDTH = 62;

    const days = useMemo(() => {

        let totalDays = (sizes.width || 0) / WIDTH;

        let offsetDate = offset / WIDTH;

        let date = moment(new Date(props.time)).subtract(Math.trunc(offsetDate), 'days');

        let start = moment(date).subtract(totalDays / 2, 'day')
        let end = moment(date).add(totalDays / 2, 'day')

        let days = [];

        for(var i = 0; i < end.diff(start, 'days'); i++){
            days.push(moment(start).add(i, 'days').format('DD/MM'))
        }
        return days;
    }, [props.time, offset, sizes])


    useEffect(() => {

        let newTime = moment(new Date(props.time)).subtract(Math.trunc(offset / WIDTH), 'days').valueOf()
        if(props.time != newTime){
            props.onTimeChange?.(newTime)
            setOffset(0)
        }
     
    }, [props.time, offset])

    const onMouseDown = (e: any) => {

        const host = e.currentTarget;

        (e.target).setPointerCapture(e.pointerId)

        const startX = e.clientX;

        let lastX = startX;

        const onMouseMove = (e: any) => {

            const deltaX = e.clientX - lastX;

            lastX = e.clientX;

            setOffset(offset => offset + deltaX)

       }   
            
        const onMouseUp = (e: any) => {
            (e.target).releasePointerCapture(e.pointerId);

            host.removeEventListener('pointerup', onMouseUp)
            host.removeEventListener('pointermove', onMouseMove)
        }
        host.addEventListener('pointerup', onMouseUp)
        host.addEventListener('pointermove', onMouseMove)
    }

    return (
        <Box sx={{
            overflow: 'hidden', 
            position: 'relative',
            height: '30px',
            userSelect: 'none'
        }}>
            <Box 
                onPointerDown={onMouseDown}
                sx={{
                    display: 'flex', 
                    left: `-50%`, 
                    width: '200%', 
                    top: '0',
                    bottom: '0',
                    position: 'absolute',
                    bgcolor: props.style?.backgroundColor || 'secondary.main', 
                    transform: `translateX(${offset % WIDTH}px)`
                }}>
                {resizeListener}

                {days.map((x) => (
                    <div 
                        style={{
                            position: 'relative',
                            color: props.style?.textColor || 'white', width: '50px', padding: '6px'}}>
                            <div style={{
                                background: day == x ? 'red' : undefined,    
                                position: 'absolute', 
                                left: 0 - offset,
                                bottom: 0,
                                width: '2px',
                                height: '100%'
                            }}>

                            </div>
                        {x}
                    </div>
                ))}
            </Box>
        </Box>
    )
}