import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { useCaretPosition } from '../../hooks';

export interface TemplateInputProps {
    variables?: any;

    delimeter?: string;
}

export const TemplateInput : React.FC<TemplateInputProps> = (props) => {
    
    const { ref, start, end, updateCaret } = useCaretPosition();

    const [ content, setContent ] = useState('')

    const selectionChanged = () => {

        updateCaret();


    }

    const onChange : ChangeEventHandler<HTMLInputElement> = (e) => {
        setContent(e.target.value)

       
    }  

    const onKeyDown = () => {

    }

    useEffect(() => {

        let arr = [...content.matchAll(new RegExp(`${props.delimeter}`, 'g'))]

        arr.forEach((match) => {
            if(start == end && props.delimeter){
                console.log(match.index, props.delimeter.length)
                if((match.index || 0) + props.delimeter?.length == start){
                    console.log("Autocomplete area");
                }
            }
        })
    }, [start])

    console.log({start, end})

    return (
        <input 
            ref={ref} 
            onSelect={selectionChanged}
            onChange={onChange} />
    )
}