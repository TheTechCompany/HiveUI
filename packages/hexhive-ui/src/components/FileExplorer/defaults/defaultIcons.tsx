import { PictureAsPdf } from "@mui/icons-material";
import React from "react";
import { IFile } from "../types/file";

export const DEFAULT_ICONS = (file: IFile) => {
    if(file.name?.indexOf('.pdf')){
        return (<PictureAsPdf fontSize="large" />);
    }
}