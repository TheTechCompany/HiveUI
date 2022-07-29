import { Box, TextField } from '@mui/material';
import React from 'react';

export interface FormInputProps {
	placeholder?: string;
	type?: string;
	
	value?: any;
	onChange?: (value: any) => void;
}
export const FormInput : React.FC<FormInputProps> = (props) => {
	return (
	
			<TextField 
				type={props.type}
				value={props.value}
				label={props.placeholder}
				onChange={(e) => props.onChange?.(e.target.value)}/>
	)
}