import React, { forwardRef } from "react";
import { Box, Typography, Button, IconButton, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

export interface GraphContainerProps {
  dataKey: string;
  label?: string;
  total?: string;
  onRemove: () => void;
}

export const GraphContainer: React.FC<GraphContainerProps> = (props) => {
  return (
    <Paper
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: '6px',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Typography>{props.label}</Typography>
          <Typography>{props.total && `total: ${props.total}`}</Typography>
        </Box>
        <IconButton
          onClick={props.onRemove}
        >
          <Close  />
        </IconButton>
      
      </Box>
      <Box sx={{display: 'flex'}}> {props.children}</Box>
    </Paper>
  );
};
