import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useContext } from "react";
import { ScheduleViewContext } from "../context";

export interface DayHeaderProps {


}

export const DayHeader : React.FC<DayHeaderProps> = (props) => {

    const { date } = useContext(ScheduleViewContext);
    
    const renderTime = (i: number, format: string) => {
        var m = moment(date);
        var d = m.add(i, 'day');
        return d.format(format);
      }

      
    const renderDayHeaders = () => {
        let headers = []
        for (var i = 0; i < 7; i++) {
          var today = new Date();
          var currentDay = today.getDate();
          var currentMonth = today.getMonth() + 1;

          headers.push((
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: (currentDay == parseInt(renderTime(i, 'DD')) && currentMonth == parseInt(renderTime(i, 'MM'))) ? 'rgba(255, 255, 255, 0.2)' : '',
                flexDirection: 'column',
                padding: '3px',
                color: 'white'
              }}
              className={(currentDay == parseInt(renderTime(i, 'DD')) && currentMonth == parseInt(renderTime(i, 'MM'))) ? ' week-day-header week-day-header-current' : 'week-day-header'}>
              <Box>
                <Typography>{renderTime(i, 'ddd')}</Typography>
              </Box>
              <Box>
                <Typography>{renderTime(i, 'DD/MM')}</Typography>
              </Box>
            </Box>
          ))
        }
        return headers;
      }
      return <>{renderDayHeaders()}</>
}