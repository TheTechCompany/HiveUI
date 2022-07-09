import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, Select, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import {DndProvider} from "react-dnd";

import { HTML5Backend } from "react-dnd-html5-backend";
import { Form } from "./components/Form";
import { FormBuilderElement, FormElement } from "./components/FormElement";
import { FormOptions } from "./components/FormOptions";
import { FormBuilderProvider } from "./context";
// import { DragDropContext, Draggable, Droppable } from "react-dnd";

export const FormBuilderItemType = {
    ELEMENT: 'element'
}

export interface FormBuilderProps {
    form: any[];
    onFormChange: (form: any[]) => void

    elements?: FormBuilderElement[];

    editable?: boolean;
}

export const FormBuilder : React.FC<FormBuilderProps> = (props) => {

    const [ form, setForm ] = useState<any[]>([]);
    
    const elements : FormBuilderElement[] = props.elements || [
        {
            tag: 'TextField',
            component: <TextField fullWidth label="TextField" size="small" />
        },
        {
            tag: 'Select',
            component: <FormControl size="small" fullWidth><InputLabel>Select</InputLabel><Select label="Select" /></FormControl>
        },
        {
            tag: 'CheckBox',
            component: <FormControlLabel control={<Checkbox />} label="CheckBox" />
        },
        {
            tag: 'Radio',
            component: <RadioGroup>
                <FormControlLabel control={<Radio />} label="Radio Item" />
                <FormControlLabel control={<Radio />} label="Radio Item 2" />
            </RadioGroup>
        }
    ]

   
    // , [JSON.stringify(props.form)])

    return (
        <FormBuilderProvider value={{
            form: form,
            setForm: setForm,
            elements: elements,
            editable: props.editable
        }}>
        <DndProvider backend={HTML5Backend}>
       
            <Box sx={{display: 'flex', flex: 1}} >

                <Form />

                <FormOptions />

            </Box>
        </DndProvider>
        </FormBuilderProvider>
    )
}