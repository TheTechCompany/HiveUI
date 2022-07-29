import React from 'react';
import { TreeItem } from '@mui/lab'
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Add, KeyboardArrowDown as CaretDownFill, ChevronRight as CaretRightFill } from '@mui/icons-material';
import styled from 'styled-components';

export const TreeNode : React.FC<any> = (props) => {
	return (
		<TreeItem
			nodeId={props.id}
			label={props.label}
			// sx={{
			// 	display: 'flex',
			// 	flexDirection: 'row',
			// 	alignItems: 'center',
			// 	bgcolor: props.node.isSelected() ? 'neutral-2' : ''
			// }}
			className={props.className}>
				{props.children}
						{/* <Box 
							sx={{
								display: 'flex'
							}}>
							<IconButton
								size="small"
								onClick={props.onToggle}
								
								style={{padding: 6, borderRadius: 3}}
							>{((props.node.hasChildren() && props.node.children.length > 0) || props.node.options.async) 
										&& !props.node.isLoading() 
										&& (props.node.isOpened() && !!props.node.hasChildren()) ? (<CaretDownFill />) : (<CaretRightFill />)}
							</IconButton>
								
							
							<Box 
								onClick={props.onSelect}>
								<Typography>{props.node.data.name}</Typography>
							</Box>
						</Box> 
						<IconButton
							size="small" 
							onClick={() => props.onCreate?.(props.node)} 
							className="create-action" >
							<Add />
					</IconButton> */}
		</TreeItem>
	)
}
