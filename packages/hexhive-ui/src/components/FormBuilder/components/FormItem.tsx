import { Box, Paper } from "@mui/material";
import React, { useContext, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { FormBuilderContext } from "../context";
import { FormBuilderItemType } from "../types";


interface DragItem {
    index: number
    id: string
    type: string
}

  
export interface FormItemProps {
    tag: string;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

export const FormItem : React.FC<FormItemProps> = (props) => {

    const { editable } = useContext(FormBuilderContext);
    
    const ref = useRef<HTMLDivElement>();

    const [, drop] = useDrop(() => ({
        accept: FormBuilderItemType.ELEMENT,
        hover: (item: DragItem, monitor) => {
            if(!ref.current){
                return;
            }

            const dragIndex = item.index;

            const hoverIndex = props.index;

            if(dragIndex == hoverIndex){
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
        
              // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            
            props.moveCard(dragIndex, hoverIndex)

            item.index = hoverIndex;
            // console.log({item, monitor})
        }
    }))

    const [, drag] = useDrag(() => ({
        type: FormBuilderItemType.ELEMENT,
        item: {
            id: '101',
            type: props.tag
        },
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging
            }
        }
    }))


    drag(drop(ref));

    return (
        <Box sx={{marginBottom: '4px', display: 'flex', '& *': {pointerEvents: editable ? 'none': undefined } }} ref={ref}>
            {props.children}
         </Box>
    )
}