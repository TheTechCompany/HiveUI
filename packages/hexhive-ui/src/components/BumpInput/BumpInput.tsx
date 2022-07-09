import React from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material'

export interface BumpInputProps {
	placeholder?: string;
	type?: string;

	value?: any;
	onChange?: (value: any) => void;

	leftIcon?: any;
	onLeftClick?: () => void;
	rightIcon?: any;
	onRightClick?: () => void;
}

export const BumpInput : React.FC<BumpInputProps> = (props) => {
	return (
		<Box>
			<Box sx={{display: 'flex', alignItems: 'center'}}>
				<IconButton 
					size="small"
					onClick={() => { 
						props.onLeftClick?.();
					}}>
					{props.leftIcon}
				</IconButton>
				
				<TextField
					type={props.type}
					value={props.value}
					onChange={(event) => { props.onChange?.(event.target.value) }}
					label={props.placeholder} />
				<IconButton
					size="small" 					
					onClick={() => {
						props.onRightClick?.();
					}}>
					{props.rightIcon}
				</IconButton>
			</Box>
		</Box>
	)
}