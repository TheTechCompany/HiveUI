import { Folder, PictureAsPdf } from "@mui/icons-material";
import React from "react";
import { IFile } from "../types/file";

export const DEFAULT_ICONS = (file: IFile) => {
    if((file.name || '').indexOf('.pdf') > -1){
        return (<PictureAsPdf fontSize="small" />);
    }

    if(file.isFolder){
        return <Folder fontSize="small" />
    }
}