import { Box, Button, List, IconButton, ListItem, ListItemButton } from "@mui/material"
import { MoreVert } from '@mui/icons-material'
import React from "react"
import styled from "styled-components"
import { HeaderBox } from "../HeaderBox"

export interface ListBoxProps {
    header: JSX.Element
    data: any[];

    renderItem: (datum: any) => JSX.Element;

    onClickItem?: (item: any) => void;
    onEditItem?: (item: any) => void;

    className?: string;
}

export const BaseListBox : React.FC<ListBoxProps> = (props) => {
    return (
        <HeaderBox
            header={props.header}
            >
            <List>
                {props.data.map((data) => (
                    <ListItem 
                        dense
                        secondaryAction={props.onEditItem && 
                                <IconButton 
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        props.onEditItem?.(data)
                                    }}
                                    >
                                    <MoreVert fontSize="inherit" />
                                </IconButton>
                        }>
                            <ListItemButton dense  onClick={props.onClickItem && (() => props.onClickItem?.(data))}>
                                {props.renderItem(data)}
                            </ListItemButton>
                            {/* <Box
                                className="list-item__content"
                                sx={{flex: 1, padding: '6px'}}>
                                {props.renderItem(data)}
                            </Box>
                             */}
                    </ListItem>
                ))}
                {/* {(datum: any) => {
                    const item = props.renderItem(datum);
                    return (
                        <Box 
                            style={{position: 'relative'}}
                            direction="row"
                            onClick={props.onClickItem && (() => props.onClickItem?.(datum))}
                            align="center" >
                            
                        </Box>
                    )
                }} */}
            </List>
        </HeaderBox>
    )
}

export const ListBox = styled(BaseListBox)`
    ${p => p.onClickItem ? `.list-item__content:hover {
        background: #dfdfdf;
    }` : ''}
`