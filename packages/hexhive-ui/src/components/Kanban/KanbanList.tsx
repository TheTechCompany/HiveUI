import { Box, Button } from '@mui/material';
import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProps, DroppableProvided } from 'react-beautiful-dnd';
import { KRow } from './Kanban';

export interface KanbanListProps{ 
    items?: KRow[];
    renderCard?: any;
    droppableId?: string;
    onCreateCard?: () => void;
    onSelectCard?: (item: any) => void;

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
                    onClick={() => props.onSelectCard?.(item)}
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
        <Button size='small' sx={{textTransform: 'none'}} onClick={props.onCreateCard}>Add task</Button>
        {dropProvided.placeholder}
        </Box>
            )}
        </Droppable>

}
