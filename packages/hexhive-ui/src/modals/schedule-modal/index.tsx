import React, { useEffect, useState } from 'react'

import { AvatarList } from '../../components/AvatarList'
import { Box, Button as GButton, Typography } from '@mui/material';
import { PeopleTab } from './tabs/people-tab';
import { EquipmentTab } from './tabs/equipment-tab';
import NoteTab from './tabs/note-tab';
import moment from 'moment';

import { Autocomplete, Dialog, Button, DialogContent, TextField } from '@mui/material';
import { ScheduleModalHeader } from './header';
import { CloneTab } from './tabs/clone-tab';
import { TabHeader } from './tabheader';
import { stringToColor } from '@hexhive/utils';

export interface ScheduleItem {
    id?: string;
    project?: { id: string };
    people?: { id: string }[];
    equipment?: string[];
    notes?: string[];

    owner?: {id: string, name: string}
    managers?: {id: string, name: string}[]
}

export interface ScheduleModalProps {
    open: boolean;
    onClose?: () => void;
    onSubmit?: (item: any) => void;
    onDelete?: () => void;

    onJoin?: () => void;
    onLeave?: () => void;

    selected?: any;

    date?: Date;

    projects?: any[]
    people?: any[];
    equipment?: any[];

}

export const ScheduleModal: React.FC<ScheduleModalProps> = (props) => {

    const [item, setItem] = useState<ScheduleItem>({})

    useEffect(() => {
        setItem({
            ...props.selected,
            // project: props.selected?.project?.id
        });

        setCloneDates([]);

    }, [props.selected]);


    const [ cloneDates, setCloneDates ] = useState<Date[]>([]);

    const [ cloneTab, openCloneTab ] = useState(false);

    const [projectSearchString, setProjectSearchString] = useState('')

    const [activeTab, setActiveTab] = useState('people')

    const canEdit = () => {
        return !props.selected || props.selected.canEdit
    }

    useEffect(() => {
        if(!props.open){
            openCloneTab(false);
        }
    }, [props.open]);

    console.log({ item })
    const renderActiveTab = () => {
        switch (activeTab) {
            case 'people':
                return (
                    <PeopleTab
                        labelKey='name'
                        selected={item.people}
                        onChange={(people) => {
                            console.log({ people })
                            setItem({ ...item, people: people })
                        }}
                        options={props.people?.filter((a) => (item.people || []).map((x: any) => x.id).indexOf(a.id) < 0)}
                    />
                );
            case 'equipment':
                return (
                    <EquipmentTab
                        labelKey='name'
                        selected={item.equipment}
                        onChange={(equipment) => {
                            setItem({...item, equipment: equipment})
                        }}
                        options={props.equipment?.filter((a) => (item.equipment || []).map((x: any) => x.id).indexOf(a.id) < 0) || []}
                    />
                );
            case 'notes':
                return (
                    <NoteTab 
                        data={item.notes || []}
                        onChange={(notes: any) => {
                            setItem({...item, notes: notes})   
                        }}
                        />
                )
        }
    }

    const onSubmit = () => {
        if(cloneTab){
            props.onSubmit?.({
                cloneDates
            })
        }else{
            console.log(item)
            props.onSubmit?.({
                ...item,
                project: item?.project?.id
            })
        }
    }

    const filterProjects = (item: any) => {
        if (!projectSearchString) return true;
        if (projectSearchString.length == 0) return true;
        if (item?.name?.indexOf(projectSearchString) > -1 || item?.displayId?.indexOf(projectSearchString) > -1) return true;
        return false;
    }

    const owners = (item.managers || []).concat(item.owner ? [item.owner] : []).map((x) => ({
        color: stringToColor(x.id),
        name: x.name
    }))

    return (
        <Dialog
            maxWidth='md'
            title={`Schedule - ${moment(props.date).format('DD/MM/yy')}`}
            open={props.open}

            onClose={props.onClose}
        >
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
                style={{ minHeight: '60vh', maxHeight: '70vh' }}>
                {/* onDelete={props.selected && props.onDelete}
            onSubmit={onSubmit} */}
                <Box     
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '3px',
                        bgcolor: 'secondary.main',
                        justifyContent: 'space-between'
                    }}>
                    <Typography>Create schedule for {moment(props.date).format('DD/MM/yy')}</Typography>
                    
                    <Box sx={{display: 'flex', alignItems: 'center'}} >
                        
                        { props.selected &&
                        <><AvatarList size={25} users={owners} />
                        <GButton 
                            onClick={() => {
                                if(canEdit()){
                                    props.onLeave?.()
                                }else{
                                    props.onJoin?.()
                                }

                                // props.onLeave()
                            }}
                            >
                                {canEdit() ? "Leave" : "Join"}
                            </GButton></>}
                    </Box>
                </Box>

                <Box
                    sx={{
                        bgcolor: 'secondary.light',
                        display: 'flex'
                    }}
                   
                >
                <ScheduleModalHeader
                    item={item}
                    onChange={(item) => setItem(item)}
                    projects={props.projects}
                   
                />

                {!cloneTab && <TabHeader 
                 setActiveTab={setActiveTab}
                 activeTab={activeTab}
                 />}
                 </Box>
                <Box sx={{flex: 1, display: 'flex'}}>
                    <Box
                        sx={{
                            maxHeight: '50vh',
                            flex: 1
                        }}>

                        {cloneTab ? (
                            <CloneTab 
                                project={props.selected?.project}
                                selected={cloneDates}
                                onSelect={(dates) => {
                                    setCloneDates(dates);
                                }} />
                        ) : renderActiveTab()}

                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
                        <Box sx={{display: 'flex', alignItems: 'center'}} >
                            {props.selected && canEdit() && <Button variant="outlined" onClick={() => openCloneTab(!cloneTab)}>{cloneTab ? "Edit" : "Clone"}</Button>}
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}} >
                            {props.selected && canEdit() && !cloneTab && <Button 
                                disabled={!canEdit()}
                                onClick={props.onDelete} style={{color: 'red'}}>Delete</Button>}
                            <Button onClick={props.onClose}>Close</Button>
                            <Button 
                                disabled={!canEdit()}
                                onClick={onSubmit} variant="contained" >{cloneTab ? "Clone" : "Save"}</Button>
                        </Box>
                    </Box>
                </Box>

            </Box>

        </Dialog>
    )
}