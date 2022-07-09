import { Box } from '@mui/material';
import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProps, DroppableProvided } from 'react-beautiful-dnd';
import { KanbanListItem } from './KanbanListItem';

export interface KanbanListProps{ 
    items?: {id: string}[];
    renderCard?: any;
    droppableId?: string;
}

export const KanbanList :  React.FC<KanbanListProps> = (props) => {
    
    return <Droppable
            droppableId={props.droppableId || ''}
            type="LIST">
            {(
                dropProvided: DroppableProvided
            ) => (
        <Box 
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
            sx={{
                display: 'flex',
                minHeight: 'min-content',
                paddingTop: '6px',
                paddingBottom: '6px',
                flexDirection: 'column',
                flex: 1
            }}>
        {props.items?.map((item, index) => 
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(
                dragProvided: DraggableProvided,
                dragSnapshot: DraggableStateSnapshot,
            ) => (
                <Box
                sx={{
                    border: `${dragSnapshot.isDragging ? '2px' : '0px'} solid lightblue`
                }}
                ref={dragProvided.innerRef}
                {...dragProvided.draggableProps}
                {...dragProvided.dragHandleProps}
                    >
                    {props?.renderCard?.(item) || 'div'}
                </Box>
            )} 
            </Draggable>
        )}
        {dropProvided.placeholder}
        </Box>
            )}
        </Droppable>

}
