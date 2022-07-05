import { Box, TextField } from "@mui/material";
import React, { useContext } from "react";
import { FormBuilderContext } from "../context";
import { FormElement } from "./FormElement";

export interface FormOptionProps {

}

export const FormOptions : React.FC<FormOptionProps> = (props) => {
    const { elements } = useContext(FormBuilderContext);

    return (
        <Box sx={{bgcolor: 'white'}} >
            {elements?.map((element) => (
                <FormElement tag={element.tag}>
                    {element.component}
                </FormElement>
            ))}
            {/* <FormElement>
                <TextField size="small" label="TextField" />
            </FormElement> */}
        </Box>
    )
}