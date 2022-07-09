import React, { useCallback, FC } from "react";
import { Box, Button, IconButton } from '@mui/material'
import {Add, KeyboardArrowDown, KeyboardArrowRight, Folder, Article as Document} from '@mui/icons-material'

const defaultGapStyle = { marginLeft: 6 };

export const TreeNode: FC<any> = (props) => {
const {
    height,
    data: { isLeaf, isSelected, onRightAction, onClick, name, nestingLevel },
    isOpen,
    resize,
    style,
    items = [],
    toggle,
    treeData: itemSize,
} = props;

    console.log(props)

    const canOpen = height <= itemSize;
    const halfSize = itemSize / 2;

    const toggleNodeSize = useCallback(
        () => resize(canOpen ? height + halfSize : height - halfSize, true),
        [height, resize],
    );

    return (
        <div
            onClick={onClick}
            style={{
                paddingTop: 4,
                paddingBottom: 4,
                alignItems: 'center',
                display: 'flex',
                cursor: 'pointer',
                background: isSelected ? 'rgba(127, 127, 127, 0.3)' : 'none',
                paddingLeft: 8 + (nestingLevel * 12 + (isLeaf ? 12 : 0)),
            }}
        >
            {!isLeaf && (
                <div>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            toggle(!isOpen)
                        }}
                        size="small"
                        >
                        {isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                     </IconButton>
                </div>
            )}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '4px'
                }}>
                {(!isLeaf || nestingLevel == 0) ? <Folder  /> : <Document />}
                <div style={defaultGapStyle}>{name}</div>
            </Box>

            {(!isLeaf || nestingLevel == 0) && (
                <IconButton
                    onClick={onRightAction}
                    style={{ padding: 4 }}
                >
                    <Add  />
                </IconButton>
            )}


        </div>
    );
};

