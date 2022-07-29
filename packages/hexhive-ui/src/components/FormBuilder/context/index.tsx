import React from "react";
import { FormBuilderElement } from "../components";

export const FormBuilderContext = React.createContext<{
    form?: any[],
    setForm?: React.Dispatch<React.SetStateAction<any[]>>

    elements?: FormBuilderElement[]

    editable?: boolean;
}>({})

export const FormBuilderProvider = FormBuilderContext.Provider