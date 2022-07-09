import React from 'react';
import { Box } from '@mui/material'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

export interface KanbanListItemProps {
    item: any,
    isDragging: boolean,
    provided: DraggableProvided,
    isClone?: boolean,
    isGroupedOver?: boolean,
    style?: Object,
    index?: number
}

export const KanbanListItem : React.FC<KanbanListItemProps> = (props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                bgcolor: "#65695C",
                flexDirection: "column",
                padding: "3px"
            }}
            {...props.provided.draggableProps}
            {...props.provided.dragHandleProps}
            data-is-dragging={props.isDragging}
            data-index={props.index}
            ref={props.provided.innerRef}
            >
            <Box>
                {props.item.name}
            </Box>
            <Box>
                Files: {(props.item.files || []).length}
            </Box>
        </Box>
    )
}