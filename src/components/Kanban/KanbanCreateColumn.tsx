import { Box, Button } from 'grommet';
import React from 'react';

export interface KanbanCreateColumnProps {
    onCreate?: () => void;
}

export const KanbanCreateColumn : React.FC<KanbanCreateColumnProps> = (props) => {
    return (
        <Box style={{display: 'flex'}} round="xsmall" pad="xsmall" background={'#dfdfdf'}>
            <Button>Create Column...</Button>
        </Box>
    )
}