import React, { ReducerAction } from 'react';

import { DateInput, FormControl } from '../../components';
import { Box, Button, Dialog, IconButton, Select, Typography } from '@mui/material'
import { useState } from 'react';
import { People, Notes, Add, Close } from '@mui/icons-material';
import moment from 'moment';
import { useEffect } from 'react';
import { ColorDot } from '../../components';
import { CapacityItem } from './CapacityItem';
import {CapacityTab} from './tabs/capacity'
import {NoteTab} from './tabs/notes'

export interface ERPModalProps {
    open: boolean;
    type: "Projects" | "People" | "Estimates",
    selected?: any;
    onClose?: () => void;
    onDelete?: () => void;
    projects?: {
        id?: string | null;
        name?: string | null;
        type?: string;
    }[]
    onSubmit?: (plan: { 
        project?: {id?: string, type?: string},
        startDate?: Date,
        endDate?: Date,
        notes?: string,
        items?: {
            location?: string;
            type?: string;
            estimate?: number;
        }[]}) => void;
}

const tab_options = [<People />, <Notes />]

export const ERPModal: React.FC<ERPModalProps> = (props) => {

    const [ tab, setTab ] = useState<number>(0);

    const [plan, setPlan] = useState<{
        project?: string,
        startDate?: string,
        endDate?: string,
        notes?: string,
        items?: {
            [key: string]: any;
            location: string;
            type: string;
            estimate?: number;
        }[]

    }>({items: []})

    useEffect(() => {
        console.log(props.selected)
        setPlan(props.selected ? {
            ...Object.assign({}, props.selected),
            project: props.selected?.project?.id,
            startDate: new Date(props.selected?.startDate)?.toISOString(),
            endDate: new Date(props.selected?.endDate)?.toISOString(),
        } : {items: []})
    }, [props.selected])

    const [search, setSearch] = useState<string>('')

    const onClose = () => {
        props.onClose?.();
        setSearch('');
        setPlan({items: []})
    }

    const onDelete = () => {
        props.onDelete?.();
        // onClose();
    }

    const onSubmit = () => {
        let submit_plan = {
            ...plan,
            project: {
                type: props.projects?.find((a) => a.id == plan.project)?.type,
                id: plan.project
            },
            startDate: new Date(moment(plan.startDate).set('hours', 0).valueOf()),
            endDate: new Date(moment(plan.endDate).set('hours', 24).valueOf())
        }

        props.onSubmit?.(submit_plan);
        setPlan({items: []})
        setSearch('');
    }

    const addCapacityItem = () => {
        let items = plan.items?.slice() || [];

        items.push({type: '', location: '', estimate: undefined})
        setPlan({...plan, items: items})
    }

    const removeCapacityItem = (ix : number) => {
        let items = plan.items?.slice() || [];

        items.splice(ix, 1);
        setPlan({...plan, items: items})
    }

    const updateCapacityItem = (ix: number, field: string, value: any) => {
        let items = plan.items?.slice() || []
        items[ix] = Object.assign(items[ix], {[field]: value});
        setPlan({...plan, items: items})
    }

    const updateNotes = (e: any) => {
        setPlan({...plan, notes: e.target.value})
    }


    const renderTab = () => {
        switch(tab){
            case 0:
                return (
                    <CapacityTab
                    addCapacityItem={addCapacityItem}
                    plan={plan}
                    removeCapacityItem={removeCapacityItem}
                    updateCapacityItem={updateCapacityItem}
                    type={props.type}/>
                    );
            case 1:
                return (
                    <NoteTab
                        notes={plan.notes}
                        updateNotes={updateNotes} />
                )
        }
    }

    return  (
        <Dialog open={props.open}
            onClose={onClose}
            >
            <Box
                >

                <Box
                   >
                    {/* Header */}
                    <Typography fontWeight="bold">Capacity Plan</Typography>
                </Box>
                <Box>
                        
                    {/* Content */}
                    <Box>
                        {props.type == "Projects" && <Box >
                            <Typography >Project</Typography>
                            <FormControl
                                // onSearch={(searchString) => { setSearch(searchString) }}
                                onChange={({option}) => { setPlan({ ...plan, project: option.id }) }}
                                value={plan.project}
                                // labelKey={(item) => item.id + ' - ' + item.name}
                                // valueKey={{key: "id", reduce: true}}
                                options={props.projects?.filter((a) => !search || `${a.id} - ${a.name}`.indexOf(search) > -1) || []}>
                                {(option) => (
                                    <Box>
                                        <ColorDot color={option.type == "Project" ? '#A3B696': '#edc25c'} size={10}/>
                                        <Typography>{option.id} - {option.name}</Typography>
                                    </Box>
                                )}
                            </FormControl>
                        </Box>}
                        <Box >
                            <Box>
                                <Typography>Start Date</Typography>
                                <DateInput
                                    //                                     calendarProps={{
                                    //     daysOfWeek: true
                                    // }}
                                    value={plan.startDate} 
                             
                                    onChange={( value ) => {
                                        // let startDate = new Date(value.toLocaleString());
                                        // let v = moment(value).format('dd/mm/yyyy').toString()
                                        try{    
                                            setPlan({ ...plan, startDate: value.toLocaleString() })
                                        }catch(e){
                                            
                                        }
                                    }}
                                    format="dd/mm/yyyy" />
                            </Box>

                            {/*
                                   // (plan.startDate && !isNaN(+plan.startDate))? 
                                    //     (plan.startDate instanceof Date) ? plan.startDate?.toISOString() : plan.startDate || '' 
                                    //     : new Date().toISOString()
                                    // }

                                     value instanceof Date ? value : new Date(value as string)
                            */}
                            <Box>
                                <Typography>End Date</Typography>
                                <DateInput
                                    // inline={false}
                                    // calendarProps={{
                                    //     daysOfWeek: true
                                    // }}
                                    value={plan.endDate}
                                     
                                    onChange={( value ) => {
                                        // let v = moment(value).format('dd/mm/yyyy')
                                        try{    
                                            setPlan({ ...plan, endDate: value.toLocaleString() })
                                        }catch(e){
                                            
                                        }
                                    }}
                                    format="dd/mm/yyyy" />
                            </Box>
                        </Box>
                    </Box>
                    <Box 
                       >
                        <Box>
                            {tab_options.map((x, ix) => <IconButton sx={{background: ix == tab ? '#dfdfdf': undefined}} onClick={() => setTab(ix)} >{x}</IconButton>)}
                            
                        </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            oveflow: 'auto',
                            minHeight: '30vh',
                            maxHeight: '100%',
                            flexDirection: 'column'
                        }}>
                       
                       {renderTab()}
      

                    </Box>
                    </Box>
                </Box>
                <Box >
                    {/* Actions */}
                    {props.selected ? (<Button color="error" onClick={onDelete}>Delete</Button>) : null}
                    <Button onClick={onClose}>Close</Button>
                    <Button color="primary" onClick={onSubmit} >Save</Button>
                </Box>
            </Box>
        </Dialog>
    );
}