import { Box, Button, Fade, IconButton, Slide, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import { useFileExplorer } from '../../context';
import { ChevronRight as Next, ChevronLeft as Previous, Download, Preview, DriveFileMove, Delete} from '@mui/icons-material';
import { Collections, List, GridView as Grid } from '@mui/icons-material'
import { Breadcrumbs } from '../breadcrumbs';

export interface ActionHeaderProps {
    onNext?: () => void
    onPrev?: () => void
}

export const ActionHeader : React.FC<ActionHeaderProps> = (props) => {
    // const actions =
    const context  = useFileExplorer()
    const { 
        files,
        view, 
        setView,
        actions,
        selected,
        breadcrumbs,
        navigate,
        setBreadcrumbs,
        triggerDeleteFile,
    } = context;

    const modes = [{key: 'list', icon: <List />}, {key: 'thumbnail', icon: <Collections />}, {key: 'grid', icon: <Grid />}];


    return (
        <Box 
            sx={{
                alignItems: 'center', 
                position: 'relative', 
                flex: 1, 
                justifyContent: 'space-between', 
                display: 'flex', 
                flexDirection: 'row', 
                paddingLeft: '6px', 
                paddingRight: '6px'
            }}>
                <Breadcrumbs 
                    onBreadcrumbClick={(crumb) => navigate?.(`/${crumb}`)}
                    breadcrumbs={breadcrumbs || []} />

                    <ToggleButtonGroup 
                        value={view} 
                        size="small"
                        exclusive={true}
                        onChange={(ev, value) => {
                            setView?.(value)
                        }}>
                        {modes.map((mode) => (
                            <ToggleButton size="small" value={mode.key}>
                                {React.cloneElement(mode.icon, {style: {fontSize: '20px'} })}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
              <Slide 
                mountOnEnter 
                unmountOnExit
                direction='left'
                in={(selected || []).length > 0}>
                    <Box
                        sx={{
                            position: 'absolute', 
                            bgcolor: 'secondary.main', 
                            top: 0, 
                            right: 0, 
                            left: 0, 
                            bottom: 0, 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center'
                        }}>
                        
                        <IconButton onClick={() => triggerDeleteFile?.((files || []).filter((a) => (selected || []).indexOf(a.id || '') > -1))} sx={{color: 'red'}}>
                            <Delete />
                        </IconButton>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            {actions?.map((action) => (
                                <IconButton 
                                    onClick={() => action?.onClick?.((files || []).filter((a) => (selected || []).indexOf(a.id || '') > -1))}
                                    sx={action.sx || {color: 'white'}}>
                                    {action.icon}
                                </IconButton>
                            ))}
                        </Box>

                        {/* <IconButton sx={{color: 'white'}}>
                            <DriveFileMove />
                        </IconButton>
                        <IconButton sx={{color: 'white'}}>
                            <Preview />
                        </IconButton>
                        <IconButton sx={{color: 'white'}}>
                            <Download />
                        </IconButton> */}
                    </Box>
              </Slide>     
        </Box>
    )
}