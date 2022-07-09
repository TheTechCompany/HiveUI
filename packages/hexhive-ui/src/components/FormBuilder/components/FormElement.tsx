import { Box, Paper } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";
import { FormBuilderItemType } from "../FormBuilder";

export interface FormBuilderElement {
    component: JSX.Element
    tag: string;
}

export interface FormElementProps {
    tag: string;
}

export const FormElement : React.FC<FormElementProps> = (props) => {

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


    return (
        <Paper ref={drag} sx={{ padding: '4px'}}>
            <Box sx={{pointerEvents: 'none'}}>
            {props.children}
            </Box>
        </Paper>
    )
}