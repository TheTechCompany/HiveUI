import { Box, Button, IconButton } from '@mui/material'
import React from 'react'
import { useFileExplorer } from '../../context';
import { ChevronRight as Next, ChevronLeft as Previous} from '@mui/icons-material';

export interface ActionHeaderProps {
    onNext?: () => void
    onPrev?: () => void
}

export const ActionHeader : React.FC<ActionHeaderProps> = (props) => {
    // const actions =
    const context  = useFileExplorer()
    const { 
        view, 
        setView,
        actions

    } = context;

    return (
        <Box 
            sx={{display: 'flex', justifyContent: 'space-between'}}>
           <Box sx={{display: 'flex'}}>
                <IconButton
                    disabled={(history as any).index <= 0}
                    
                    style={{padding: 6}}
                    onClick={props.onPrev}
                    >
                        <Previous sx={{fontSize:"18px"}} />
                    </IconButton>
                <IconButton 
                    disabled={(history as any).index >= history.length}
                    
                    style={{padding: 8}}
                    onClick={props.onNext}
                >
                    <Next sx={{fontSize:"18px" }}/>
                </IconButton>
            
            </Box> 
            <Box sx={{display: 'flex'}}>
                {actions?.map((action) => (
                    <Button 
                        style={{padding: 8}}
                        // onClick={() => action.onClick()} 
                        disabled={action.disabled instanceof Function ? action.disabled(context) : action.disabled} 
                        startIcon={React.cloneElement(action?.icon || <></>, {sx: {fontSize: '18px'}})} 
                        >{action.key}</Button>
                
                ))}
            </Box>
        </Box>
    )
}