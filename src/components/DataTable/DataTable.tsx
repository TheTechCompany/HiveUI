import { BaseStyle } from '@hexhive/styles';
import { TableContainer,Table, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { TableBody } from 'grommet';
import React from 'react';


export interface DataTableColumn {
    property: string;
    header?: string;
    size?: string;
    sortable?: boolean;
    align?: string;
}

export interface DataTableProps {
    data?: any[];
    columns?: DataTableColumn[]

    order: 'asc' | 'desc',
    orderBy?: string;
    onSort?: (property: string) => void;
    onClickRow?: (item: any) => void;
}

export const DataTable : React.FC<DataTableProps> = (props) => {

    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        props.onSort?.(property)
    }

    return (
        <TableContainer>
            <Table>
                <TableHead sx={{background: BaseStyle.global.colors['accent-2'], padding: 6}}>
                    <TableRow>
                        {props.columns?.map((column) => (
                            <TableCell 
                                sx={{color: 'white'}}
                                sortDirection={props.orderBy === column.property ? props.order : false}
                                >
                                {column.sortable && 
                                    <TableSortLabel 
                                        sx={{'& svg': {color: 'white !important'}}}
                                        active={props.orderBy === column.property} 
                                        direction={props.orderBy === column.property ? props.order : 'asc'} 
                                        onClick={createSortHandler(column.property)} />}
                                {column.header || column.property}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data?.map((data) => (
                        <TableRow 
                            hover={Boolean(props.onClickRow)}
                            onClick={() => props.onClickRow?.(data)}>
                            {props.columns?.map((column) => (
                                <TableCell>{data?.[column.property]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}