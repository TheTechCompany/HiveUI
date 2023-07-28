import React, {useMemo, useRef, useState} from "react";
import { PureComponent } from "react";
import styled from "styled-components";
import { Box, Typography, Popover } from "@mui/material";
import { Moment } from "moment";
export interface HeaderItemProps{
    left?: number;
    width: number;
    label?: string | number;
    mode?: string;
    background?: any;

    date?: Moment;
    dayStatus?: (day: Moment) => any;
    dayInfo?: (day?: Moment) => any;

    y?: number;
    className?: string;
  }
  
  export const BaseHeaderItem : React.FC<HeaderItemProps> = (props) => {
    const [ info, setInfo ] = useState<any>()
    const [ hovering, setHovering ] = useState<boolean>(false)

    const status = useMemo(() => {
      if (props.dayStatus && props.date) return props.dayStatus(props.date)
      return null
    }, [props.date])

    const ref = useRef<HTMLDivElement | null>(null)
      return (
        <Box
          ref={ref}
          className={props.className}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: status,
            borderLeft: 'solid 1px rgb(216, 217, 218)',
            position: 'absolute',
            height: 20,
            left: props.left,
            width: props.width,
            cursor: 'pointer'
          }}
          onMouseOut={() => {
           if(props.y == 2) {
              setHovering(false)

           }
          }}
          onMouseOver={() => {
            if(props.y == 2) {
              if(props.dayInfo?.(props.date)){
                setInfo(props.dayInfo?.(props.date))
                setHovering(true)
              }
            }
          }}
        >
          <Typography fontSize="12px">{props.label}</Typography>

        <Popover
          open={hovering}
            anchorEl={ref.current || undefined}>
              <Box 
                sx={{
                  display: 'flex', 
                }}>
                <Box 
                  sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px'}}
                >
                  <Typography >Week capacity: {info}</Typography>
                </Box>
              </Box>
          </Popover>
        </Box>
      );
    
  }
  
  export const HeaderItem = styled(BaseHeaderItem)`
  
    &:hover{
        background: rgba(127, 127, 127, 0.3);
    }
  `