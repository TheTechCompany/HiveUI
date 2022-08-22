import { FastForward, FastRewind, PlayArrow } from '@mui/icons-material';
import { Box, Typography } from '@mui/material'
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import useResizeAware from 'react-resize-aware';
import { InfiniteScrubberProvider } from './context';
import { ScrubberControls } from './controls';

export interface InfiniteScrubberProps {
    time: number;
    onTimeChange?: (time: number) => void;

    style?: {
        backgroundColor?: string;
        textColor?: string;
    }
    controls?: boolean;
}

export const InfiniteScrubber: React.FC<InfiniteScrubberProps> = ({
    time,
    onTimeChange,
    style = {
        backgroundColor: 'secondary.main',
        textColor: 'white'
    },
    controls
}) => {

    const [ playing, setPlaying ] = useState(false);

    const [ speed, setSpeed ] = useState(0);

    const [resizeListener, sizes] = useResizeAware();

    const day = moment(new Date(time)).format('DD/MM')
    const [offset, setOffset] = useState<number>(0);

    const WIDTH = 62;

    const days = useMemo(() => {

        let totalDays = (sizes.width || 0) / WIDTH;

        let offsetDate = offset / WIDTH;

        let date = moment(new Date(time)).subtract(Math.trunc(offsetDate), 'days');

        let start = moment(date).subtract(totalDays / 2, 'day')
        let end = moment(date).add(totalDays / 2, 'day')

        let days = [];

        for (var i = 0; i < end.diff(start, 'days'); i++) {
            days.push(moment(start).add(i, 'days').format('DD/MM'))
        }
        return days;
    }, [time, offset, sizes])


    useEffect(() => {

        let newTime = moment(new Date(time)).subtract(Math.trunc(offset / WIDTH), 'days').valueOf()
        if (time != newTime) {
            onTimeChange?.(newTime)
            setOffset(0)
        }

    }, [time, offset])

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

    useEffect(() => {
        if(speed > 0 || speed < 0){
            
            let int = setInterval(() => {
                setOffset((offset) => offset + (speed * -1))
            }, 1000 / 60)

            return () => {
                clearInterval(int);
            }
        }
    }, [speed])

    return (
        <InfiniteScrubberProvider
            value={{
                playing: playing,
                speed,
                pause: () => {
                    setSpeed(0)
                    setPlaying(false)
                },
                play: () => {
                    setSpeed(1)
                    setPlaying(true)
                },
                fastForward: () => {
                    setSpeed((speed) => speed + 1)
                },
                rewind: () => {
                    setSpeed((speed) => speed - 1)
                }
            }}
            >
            <Box sx={{
                bgcolor: style?.backgroundColor || 'secondary.main'
            }}>
                {controls && (
                    <ScrubberControls
                        color={style?.textColor || 'white'}
                    />
                )}
                <Box sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
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
                            transform: `translateX(${offset % WIDTH}px)`
                        }}>
                        {resizeListener}

                        {days.map((x) => (
                            <div
                                style={{
                                    position: 'relative',
                                    color: style?.textColor || 'white', width: '50px', padding: '6px'
                                }}>
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
            </Box>
        </InfiniteScrubberProvider>

    )
}