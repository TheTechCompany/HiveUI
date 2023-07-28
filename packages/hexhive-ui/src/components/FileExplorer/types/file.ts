export interface IFile {
    id?: string;
    icon?: any;
    name?: string;
    size?: number;
    lastUpdated?: Date;
    isFolder?: boolean;
}

export interface Breadcrumb {
    id?: string;
    name: string;
}