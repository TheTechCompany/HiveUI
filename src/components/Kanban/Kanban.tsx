import React, { useState } from "react";
import { Box } from "grommet";
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
  rows: any[];
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
}
export const Kanban: React.FC<BaseKanbanProps> = ({
  containerHeight,
  useClone,
  isCombineEnabled,
  withScrollableColumns,
  renderCard,
  onDrag,
  onCreateColumn,
  columns = [],
}) => {
  const [columnsState, setColumnsState] = useState(columns);
  const onDragEnd = (result: DropResult) => {
    console.log(result);

    let origin: number = parseInt(result.source.droppableId);
    let dest = result.destination?.droppableId;

    if (!result.destination) return;
    else if (origin !== parseInt(dest!)) {
      const items = Array.from(columns[origin].rows);
      const itemsDest = Array.from(columns[parseInt(dest!)].rows);

      const [reorderedItem] = items.splice(result.source.index, 1);
      itemsDest.splice(result.destination.index, 0, reorderedItem);

      console.log(items, itemsDest);

      let newColumns = [...columns];

      newColumns[origin].rows = items;
      newColumns[parseInt(dest!)].rows = itemsDest;

      setColumnsState(newColumns);
    } else {
      const items = Array.from(columns[origin].rows);

      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      let newColumns = [...columns];

      newColumns[origin].rows = items;

      setColumnsState(newColumns);
    }

    // if (dest) {
    //   let item_ix = columns[origin].rows
    //     ?.map((x) => x.id)
    //     .indexOf(result.draggableId);
    //   console.log(item_ix);

    //   if (item_ix && item_ix > -1) {
    //     let item = columns[origin].rows?.splice(item_ix, 1);
    //     columns[parseInt(dest)].rows?.push(item);
    //   }
    // }

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
          gap="small"
          pad="small"
          direction="row"
          flex
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
    <DragDropContext onDragEnd={onDragEnd || onDrag}>
      <Box flex>{board}</Box>
    </DragDropContext>
  );
};
