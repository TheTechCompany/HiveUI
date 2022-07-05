import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, Select, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { DndProvider, useDrop, useDrag } from "react-dnd";
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
    onFormChange: (form: any[]) => void;

    elements?: FormBuilderElement[];
}

export const FormBuilder : React.FC<FormBuilderProps> = (props) => {

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

    console.log(props.form)
    const updateForm = ({type, item}: any) => {
        let _form = props.form.slice();
        switch(type){
            case 'CREATE':
                _form.push(item);
                break;
            case 'UPDATE':
                break;
            case 'REMOVE':
                break;
        }
        props.onFormChange(_form)
        console.log("UPdate", props.form, _form)
    }
    // , [JSON.stringify(props.form)])

    return (
        <FormBuilderProvider value={{
            form: props.form,
            updateForm: updateForm,
            elements: elements
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