import { CircularProgress, Paper, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';

export interface DelayedSwitchProps {
    value: boolean;
    onChange?: (checked: boolean) => void;
}

export const DelayedSwitch : React.FC<DelayedSwitchProps> = (props) => {

    const [ value, setValue ] = useState(true);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(false);
        setValue(props.value)
    }, [props.value])

    const onChange = (e: boolean) => {
        setLoading(true)
        setValue(e)
        props.onChange?.(e)
    }

    return (
        <Switch
            size={'small'}
            checked={value}
            color='secondary'
            onChange={(e, checked) => onChange?.(checked)}
            icon={(
                <Paper elevation={2} sx={{display: 'flex', backgroundColor: 'white', borderRadius: '20px', height: '16px', width: '16px', alignItems: 'center', justifyContent: 'center'}}>
                    {loading && <CircularProgress size={'12px'} />}
                </Paper>
            )}
            // checkedIcon={(
            //     <Paper elevation={2} sx={{display: 'flex', backgroundColor: 'white', borderRadius: '20px', height: '16px', width: '16px', alignItems: 'center', justifyContent: 'center'}}>
            //         {loading && <CircularProgress size={'12px'} />}
            //     </Paper>
            // )}
            />
    )
}