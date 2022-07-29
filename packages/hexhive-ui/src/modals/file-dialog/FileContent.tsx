import { Box } from '@mui/material';
import React from 'react';
import { FileViewer, FileViewerFile } from '../../components';
import styled from 'styled-components'

export interface FileContentProps {
    files?: FileViewerFile[];
    token?: string;
    className?: string;
}

export const BaseFileContent : React.FC<FileContentProps> = ({className, files = [], token}) => {
    return (
        <Box className={className} sx={{display: 'flex', flexDirection: 'column'}}>
            <FileViewer files={files} token={token} />
        </Box>
    );
}

export const FileContent = styled(BaseFileContent)`
    & > * {
        width: 100%;
        height: 100%;
    }
`