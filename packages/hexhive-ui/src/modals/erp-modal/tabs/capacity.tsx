import React from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
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
                    size="small"
                    onClick={addCapacityItem}
                >
                    <Add />
                 </IconButton>
            </Box>
            <Box
                gap="xsmall"
                sx={{minHeight: '20vh', maxHeight: '40vh'}}
                overflow={'auto'}>
                {plan.items?.map((x: any, ix: number) => [
                    <CapacityItem
                        item={x}
                        type={type}
                        removeCapacityItem={() => removeCapacityItem(ix)}
                        updateCapacityItem={(key, value) => updateCapacityItem(ix, key, value)} />,
                    <Divider />
                ])}
            </Box>

        </>
    );
}
