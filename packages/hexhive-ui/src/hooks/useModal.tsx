import React, { useState } from 'react';


export const useModal = () => {
    const [ open, openModal ] = useState(false);
    const [ selected, setSelected ] = useState<any>(null);

    const onClose = () => {
        openModal(false);
        setSelected(null);
    }

    return {
        open,
        openModal,
        selected,
        setSelected,
        onClose
    }
}