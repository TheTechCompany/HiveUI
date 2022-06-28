import { SxProps, Theme } from "@mui/material";
import { IFileExplorerContext } from "../context";
import { IFile } from "./file";

export interface IAction {
    key: string;
    icon?: JSX.Element;
    label: string;
    sx?: SxProps<Theme>;
    seperator?: "top" | "bottom";
    onClick?: (file: IFile) => void;
    disabled?: boolean | ((state: IFileExplorerContext) => boolean)
}