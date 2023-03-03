import { Box, TextField } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { FormBuilderContext } from "../context";
import { FormBuilderItemType } from "../types";
import { FormItem } from "./FormItem";
import update from 'immutability-helper'

export const Form = () => {

    const { form, setForm, elements } = useContext(FormBuilderContext)

    const [ item, setItem ] = useState<{x: number, y: number} | null>(null)

    const [{dragOver, dragPosition}, drop] = useDrop(() => ({
        accept: FormBuilderItemType.ELEMENT,
        drop: (info, monitor) => {
            let { x, y } = monitor.getClientOffset() || {x: 0, y: 0};
            setItem({x, y})

            setForm?.([...(form||[]), info]) //?.({type: 'CREATE', item: info})
        },
        collect(monitor) {
            return {
                dragOver: monitor.isOver(),
                dragPosition: monitor.getSourceClientOffset()
            }
        },
    }), [form])

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {

        if(dragIndex == undefined || hoverIndex == undefined) return;

        let forms = (form || []).slice();

        setForm?.((prevForm) => 
                    update(prevForm, {
                        $splice: [
                            [dragIndex,1],
                            [hoverIndex, 0, prevForm[dragIndex]]
                        ]
                    })
        );
        // setForm?.((forms) => update(forms, {
        //     $splice: [
        //         [dragIndex, 1],
        //         [hoverIndex, 0, forms[dragIndex]]
        //     ]   
        // })),[]);

        // forms[hoverIndex] = forms?.splice(dragIndex, 1, forms[hoverIndex])[0];

        // setForm?.(forms)
//
    }, [form])

    const renderCard = useCallback((card, index) => {
        return (
            <FormItem index={index} moveCard={moveCard} tag={card?.tag}>
                    {/* {form_item.tag} */}
                    {elements?.find((a) => a.tag == card?.type)?.component}
                    {/* <TextField fullWidth size="small" label="TextField" /> */}
            </FormItem>
        )
    }, [])

    return (
        <Box ref={drop}  sx={{ bgcolor: dragOver ? '#efefef' : '#dfdfdf', flex: 1, display: 'flex', flexDirection: 'column'}}>
            {/* {dragOver && <div style={{position: 'absolute', top: dragPosition?.y, left: dragPosition?.x, width: '10px', height: '10px', background: 'red'}} />} */}
            {form?.map((form_item, ix) => renderCard(form_item, ix))}
        </Box>
    )
}