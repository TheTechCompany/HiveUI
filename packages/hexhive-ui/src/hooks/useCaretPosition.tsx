import { useCallback, useRef, useState } from 'react';
import React from 'react';

export function useCaretPosition<
    T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(){
    const node = useRef<T>(null);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);

    const updateCaret = useCallback(() => {
        if(node && node.current){
            const { selectionStart, selectionEnd } = node.current;

            setStart(selectionStart!);
            setEnd(selectionEnd!);
        }
    }, [])

    return {
        start,
        end,
        ref: node,
        updateCaret
    }
}