import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { KanbanList } from './KanbanList';
import { KanbanColumnMenu } from './KanbanColumnMenu';
import { dateFromObjectID } from '@hexhive/utils';
import { KRow } from './Kanban';


export interface KanbanColumnProps {
    title?: string;
    ttl?: number;
    menu?: {
        label?: string;
        onClick?: string;
    }[]
    index?: number;
    items?: KRow[];

    isCombineEnabled?: boolean,
    useClone?: boolean,
    isScrollable?: boolean;
    renderCard?: any;

    onCreateCard?: (column: string) => void;
    onSelectCard?: (item: any) => void;

}

export const KanbanColumn : React.FC<KanbanColumnProps> = ({
    title = '',
    index = 0,
    ttl,
    items = [],
    isCombineEnabled,
    useClone,
    isScrollable,
    renderCard,
    onCreateCard,
    onSelectCard,
    menu = []
}) => {
    return (
            <Paper 
                sx={{
                    marginRight: '6px',
                    flexDirection: 'column',
                    width: '300px',
                    display: 'flex'
                }}>
                <Box 
                    sx={{
                        color: 'white',
                        bgcolor: "secondary.main",
                        padding: '3px',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: "1px solid black",
                        flexDirection: 'row',
                        display: 'flex'
                    }}
                    >
                    <Box sx={{display: 'flex', flex: 1}}>
                        <Typography>{title}</Typography>
                    </Box>
                
                    <KanbanColumnMenu menu={menu}  />
                    {/* <Box
                        style={{userSelect: 'none'}}
                        align="center"
                        justify="center"
                        width="30px"
                        height="30px"
                        pad="xsmall"
                        background="dark-3"
                        round="large">
                        <Text size="small">{items?.length}</Text>
                    </Box> */}
                </Box>
                <Divider />
                <Box 
                    sx={{
                        padding: '6px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto'
                    }}>
                 <KanbanList 
                    droppableId={`${index}`}
                    renderCard={renderCard} 
                    onCreateCard={() => onCreateCard?.(title)}
                    onSelectCard={onSelectCard}
                    items={items.filter((a: any) => {
                        return (!a.lastUpdated || !ttl || (Date.now() - new Date(a.lastUpdated).getTime()) < ttl)
                    })}/>

                </Box>
            </Paper>
      
    )
}