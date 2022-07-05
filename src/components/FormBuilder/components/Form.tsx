import { Box, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { FormBuilderContext } from "../context";
import { FormBuilderItemType } from "../FormBuilder";

export const Form = () => {

    const { form, updateForm, elements } = useContext(FormBuilderContext)

    const [ item, setItem ] = useState<{x: number, y: number} | null>(null)

    const [, drop] = useDrop(() => ({
        accept: FormBuilderItemType.ELEMENT,
        drop: (info, monitor) => {
            let { x, y } = monitor.getClientOffset() || {x: 0, y: 0};
            setItem({x, y})

            updateForm?.({type: 'CREATE', item: info})

            console.log({info, monitor: monitor.getClientOffset()}) 
        }
    }), [form])

    return (
        <Box ref={drop}  sx={{ bgcolor: '#dfdfdf', flex: 1, display: 'flex', flexDirection: 'column'}}>
            {form?.map((form_item) => (
                <div style={{marginBottom: '4px', display: 'flex'}}>
                    {/* {form_item.tag} */}
                    {elements?.find((a) => a.tag == form_item.type)?.component}
                    {/* <TextField fullWidth size="small" label="TextField" /> */}
                </div>
            ))}
        </Box>
    )
}