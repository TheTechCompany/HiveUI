import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import Config from "../../helpers/config/Config";
import { Task } from "../../types";
import ContentEditable from "../common/ContentEditable";
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';

export interface TaskRowProps {

  item: Task;
  label?: string;

  index: number;

  isSelected?: boolean;
  nonEditable?: boolean;

  onUpdateTask?: (item: any, update: { name: string }) => void;
  onSelectItem?: (item: any) => void;

  top: number;
  itemheight: number;

}
export const TaskRow: React.FC<TaskRowProps> = (props) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.item?.id || 'asdf' });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const onChange = (value: any) => {
    if (props.onUpdateTask) {
      props.onUpdateTask?.(props.item, { name: value });
    }
  };

  const label = useMemo(() => {
    if ((props.label || '').length > 30) {
      return props.label?.substring(0, 30) + "...";
    }
    return props.label;
  }, [props.label])


  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        top: props.top,
        paddingLeft: 12,
        paddingRight: 12,
        minHeight: props.itemheight + 4
      }}
      onClick={(e) => props.onSelectItem?.(props.item)}
    >

      <div className="color-dot" style={{
        width: 12,
        height: 12,
        borderRadius: 12,
        marginRight: 8,
        background: props.item.color as string
      }} />
      {/* this.props.nonEditable */}
      {true ? (
        <Box sx={{ display: 'flex', whiteSpace: 'no-wrap', justifyContent: 'flex-start' }} tabIndex={props.index} >
          <Typography textOverflow={'ellipsis'} fontSize={"10px"} >{label}</Typography>
        </Box>
      ) : (
        <ContentEditable value={label} index={props.index} onChange={onChange} />
      )}
    </Box>
  );

}
