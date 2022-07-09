import React from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { CapacityItem } from '../CapacityItem';

export const CapacityTab = ({
    addCapacityItem,
    plan,
    removeCapacityItem,
    updateCapacityItem,
    type
}: any) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    minHeight: 'min-content',
                flexDirection: "row",
                alignItems:"center",
                justifyContent:"space-between"
                }}>
                <Typography fontWeight="bold">Capacity</Typography>
                <IconButton
                    onClick={addCapacityItem}
                >
                    <Add />
                 </IconButton>
            </Box>
            <Box
                gap="xsmall"
                height={'min-content'}
                overflow={'scroll'}>
                {plan.items?.map((x: any, ix: number) => (
                    <CapacityItem
                        item={x}
                        type={type}
                        removeCapacityItem={() => removeCapacityItem(ix)}
                        updateCapacityItem={(key, value) => updateCapacityItem(ix, key, value)} />
                ))}
            </Box>

        </>
    );
}
