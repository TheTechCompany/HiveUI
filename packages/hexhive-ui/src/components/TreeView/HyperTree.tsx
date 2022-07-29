import React from 'react';
import { TreeView } from '@mui/lab'
import { Box, SxProps, Theme } from '@mui/material';
import { TreeNode } from './HyperTreeNode'
import { ChevronRight, ExpandMore } from '@mui/icons-material';

export interface TreeItem {
	id: string;
	label: string;
	children?: TreeItem[];
}

export interface TreeViewProps {
	id: string,
	data: TreeItem[];

	onSelect?: (node: any) => void;
	onCreate?: (node: any) => void;

	sx?: SxProps<Theme>;
}

export const HyperTree : React.FC<TreeViewProps> = (props) => {

	const renderItem = (item: TreeItem) => {
		let children = (item.children || []).map(renderItem);

		return (
			<TreeNode id={item.id} label={item.label}>
				{children}
			</TreeNode>
		)
	}
	return (
			<TreeView
				defaultCollapseIcon={<ExpandMore />}
				defaultExpandIcon={<ChevronRight />}
				sx={props.sx}
			>
				{props.data?.map(renderItem)}
{/* 				
				renderNode={(node) => {
					console.log(node)
					return (
					<HyperTreeNode {...node} onSelect={(e : React.MouseEvent<any>) => {
						node.onSelect(e)
						props.onSelect?.(node.node)
					}} onCreate={props.onCreate} />
				)
				}} */}
			

		</TreeView>
	)
}