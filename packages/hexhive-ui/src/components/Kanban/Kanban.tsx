import React from "react";
import { Box } from "@mui/material";
import {
  Droppable,
  DroppableProvided,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";

import { KanbanColumn } from "./KanbanColumn";
import { KanbanCreateColumn } from "./KanbanCreateColumn";

export interface KColumn {
  id?: any;
  title?: string;
  ttl?: number;
  menu?: { label: string; onClick?: any }[];
  rows?: any[];
}

export interface BaseKanbanProps {
  containerHeight?: number;
  useClone?: boolean;
  isCombineEnabled?: boolean;
  withScrollableColumns?: boolean;

  renderCard?: (item?: any) => any;
  onDrag?: (result: DropResult) => void;
  
  onCreateColumn?: () => void;
  columns?: Array<KColumn>;

  onCreateCard?: (column: string) => void;
}
export const Kanban: React.FC<BaseKanbanProps> = ({
  containerHeight,
  useClone,
  isCombineEnabled,
  withScrollableColumns,
  renderCard,
  onDrag,
  onCreateColumn,
  onCreateCard,
  columns = [],
}) => {
  const onDragEnd = (result: DropResult) => {
    console.log(result);

    let origin: number = parseInt(result.source.droppableId);
    let dest = result.destination?.droppableId;

    if (dest) {
      let item_ix = columns[origin].rows
        ?.map((x) => x.id)
        .indexOf(result.draggableId);
      if (item_ix && item_ix > -1) {
        let item = columns[origin].rows?.splice(item_ix, 1);
        columns[parseInt(dest)].rows?.push(item);
      }
    }

    //     onChange?.(columns)
  };

  const board = (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={Boolean(containerHeight)}
    >
      {(provided: DroppableProvided) => (
        <Box
          sx={{
            padding: '6px',
            flexDirection: 'row',
            display: 'flex',
            flex: 1
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {columns.map((key, index: number) => (
            <KanbanColumn
              ttl={key.ttl}
              key={key.id}
              index={index}
              menu={key.menu}
              title={key.title}
              items={key.rows}
              isScrollable={withScrollableColumns}
              isCombineEnabled={isCombineEnabled}
              useClone={useClone}
              onCreateCard={onCreateCard}
              renderCard={renderCard}
            />
          ))}
          <Box>
            {onCreateColumn && <KanbanCreateColumn onCreate={onCreateColumn} />}
          </Box>
          
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDrag || onDragEnd}>
      <Box sx={{flex: 1, display: 'flex'}}>{board}</Box>
    </DragDropContext>
  );
};
