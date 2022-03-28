import { Box, Button, List } from "grommet"
import { MoreVertical } from 'grommet-icons'
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
    console.log({props})
    return (
        <HeaderBox
            header={props.header}
            >
            <List 
                className={props.className}
                pad={'none'}
                data={props.data}>
                {(datum: any) => {
                    const item = props.renderItem(datum);
                    return (
                        <Box 
                            style={{position: 'relative'}}
                            direction="row"
                            onClick={props.onClickItem && (() => props.onClickItem?.(datum))}
                            align="center" >
                            <Box
                                pad="xsmall"
                                className="list-item__content"
                                flex>
                                {item}
                            </Box>
                            {props.onEditItem && 
                                <Button 
                                    plain 
                                    style={{position: 'absolute', right: 6, padding: 6, borderRadius: 3}} 
                                    hoverIndicator 
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        props.onEditItem?.(datum)
                                    }}
                                    icon={<MoreVertical size="small" />} />
                            }
                        </Box>
                    )
                }}
            </List>
        </HeaderBox>
    )
}

export const ListBox = styled(BaseListBox)`
    ${p => p.onClickItem ? `.list-item__content:hover {
        background: #dfdfdf;
    }` : ''}
`