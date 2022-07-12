import React from 'react';
import { useContext } from 'react';
import { IAction } from '../types/action';
import { Breadcrumb, IFile } from '../types/file';

export interface IFileExplorerContext {
    files?: IFile[]

    breadcrumbs?: Breadcrumb[];
    setBreadcrumbs?: (breadcrumbs: Breadcrumb[]) => void;

    uploading?: {name?: string, percent?: number}[]
    location?: string;
    selected?: string[];
    clickFile?: (file: IFile) => void;
    selectFile?: (file?: string, checked?: boolean) => void;
    view?: string;
    setView?: (view: string) => void;

    navigate?: (id: string) => void;

    actions?: IAction[]

    triggerRenameFile?: (file: IFile) => void;
    triggerDeleteFile?: (file: IFile | IFile[]) => void;
}

export const FileExplorerContext = React.createContext<IFileExplorerContext>({})

export const useFileExplorer = () => useContext(FileExplorerContext)