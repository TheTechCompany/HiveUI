import React from 'react';
import { Box, DateInput as GrommetDateInput } from 'grommet';
import moment from 'moment';

export interface DateInputProps {
    format?: string;

    value?: string;
    onChange?: (date: string) => void;
}

export const DateInput : React.FC<DateInputProps> = (props) => {

    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
	const longDateFormat = moment.localeData(locale).longDateFormat('L').toLowerCase();

    return (
        <Box>
            <GrommetDateInput
                format={props.format || longDateFormat || 'dd/mm/yyyy'}
                value={props.value}
                onChange={props.onChange && (({value}) => props.onChange?.(value.toLocaleString()))}
                />
        </Box>
    )
}