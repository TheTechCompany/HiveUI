import React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Box, FormControl, TextField } from '@mui/material'
import moment from 'moment';

export interface DateInputProps {
    format?: string;

    label?: string;

    value?: string;
    onChange?: (date: string) => void;
}

export const DateInput : React.FC<DateInputProps> = (props) => {

    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
	const longDateFormat = moment.localeData(locale).longDateFormat('L').toLowerCase();

    return (
            <DesktopDatePicker
                inputFormat={props.format || longDateFormat || 'DD/MM/yyyy'}
                value={props.value}
                label={props.label}
                renderInput={(params) => <TextField size="small" {...params} />}
                onChange={(value) => {
                    props.onChange?.(new Date(value?.valueOf() || '').toISOString())
                    // if(!props.onChange): (value) => {}}
                }}
                />
    )
}