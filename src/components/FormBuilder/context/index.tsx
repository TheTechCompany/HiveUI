import React from "react";
import { FormBuilderElement } from "../components";

export const FormBuilderContext = React.createContext<{
    form?: any[],
    updateForm?: (args: {type: "CREATE" | "UPDATE" | "REMOVE", item: any}) => void

    elements?: FormBuilderElement[]
}>({})

export const FormBuilderProvider = FormBuilderContext.Provider