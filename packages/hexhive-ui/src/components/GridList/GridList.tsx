import React from 'react';
import { Box } from '@mui/material'

export interface GridListProps {
	data?: any[]
	renderItem?: (item: any) => any;
}

export const GridList : React.FC<GridListProps> = (props) => {
	return (
		<Box 
			sx={{display: 'flex', flexWrap: 'wrap'}}>
			
			{props.data?.map((item) => props.renderItem?.(item))}
		</Box>	
	)
}