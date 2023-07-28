import { Box, Typography, Select, MenuItem, FormControl as MuiFormControl, InputLabel } from '@mui/material';
import React from 'react';

export interface FormControlProps {
	placeholder?: string;
	options?: any[];
	valueKey?: string;
	labelKey?: string;
	children?: ((item: any) => JSX.Element);
	value?: any;
	onChange?: (value: any) => void;
	multiple?: boolean;
	size?: 'small' | 'medium';
	fullWidth?: boolean;
}
export const FormControl : React.FC<FormControlProps> = (props) => {
	return (
		<MuiFormControl
			size={props.size || 'small'}	
			fullWidth={props.fullWidth} >
			<InputLabel>{props.placeholder}</InputLabel>
			<Select
				multiple={props.multiple}
				value={props.value}
				label={props.placeholder}
				onChange={(event) => {
					props.onChange?.(event.target.value)
			 	}}>
				{props.options?.map((option, index) => {
					return typeof(props.labelKey) == "string" ? (
						<MenuItem value={option?.[props.valueKey || 'id']}>
							<Typography>{option[props.labelKey || 'name']}</Typography>
						</MenuItem>
					) : (
						<MenuItem value={option?.[props.valueKey || 'id']}>
							{props.children?.(option)}
						</MenuItem>
					)
				})}
			</Select>
		</MuiFormControl>
	)
}