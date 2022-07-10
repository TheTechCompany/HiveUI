import { Box, Typography } from '@mui/material';
import {FolderZip, CopyAll as Multiple} from '@mui/icons-material'
import React from 'react';
import { DocViewer } from './DocViewer';
import styled from 'styled-components'

export interface FileViewerFile {
    url?: string;
    mimeType?: string;
    extension?: string;
}

export interface FileViewerProps {
    files: FileViewerFile[]

    token?: string;
    className?: string;
}

export const BaseFileViewer: React.FC<FileViewerProps> = ({
    files = [],
    token,
    className
}) => {

    const getContent = (main: string, sub: string, url: string) => {
        switch (main) {
            case "video":
                return (
                    <video autoPlay={false} src={url} />
                );
            case "image":
                return (<img style={{ width: '100%' }} src={url} />)
            case "application":
                switch (sub) {
                    case "pdf":
                    case "word":
                    case "spreadsheet":
                    case "vnd.openxmlformats-officedocument.wordprocessingml.document":
                    case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        return (
                            <DocViewer
                                documentUrl={url}
                                documentType={`${main}/${sub}`} />

                        )
                    case "zip":
                    case "octet-stream":
                    case "x-zip-compressed":
                    case "x-rar-compressed":
                        return (
                        <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <FolderZip fontSize="large" />
                        </Box>
                        );
                    default:
                        return null;
                }

            default:
                return null;
        }
    }
    
    if (files && files.length == 1) {
        let file = files[0]
        let mimetype = file.mimeType ? file.mimeType : 'text/plain'
        console.log(file)
        let url = file.url // `${process.env.REACT_APP_API && process.env.REACT_APP_API.length > 0 ? process.env.REACT_APP_API : window.location.origin}/api/files/${file.id}${file?.extension ? file?.extension : ''}?access_token=${token}`;

        let main = mimetype.split('/')[0];
        let sub = mimetype.split('/')[1];

        const content = getContent(main, sub, url || '')

        return (
            <Box
                sx={{display: 'flex', flex: 1}}
                className={className} >
                {content}
            </Box>
        )
        
       
    } else {
        return (
            <Box
                className={className}
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
                >
                <Multiple fontSize="large" />
                <Typography sx={{marginTop: '4px'}}>{files.length} files</Typography>
            </Box>
        )
        //TODO render multi file placeholder
        return null;
    }
}

export const FileViewer = styled(BaseFileViewer)`
    #react-doc-viewer {
        flex: 1
    }
`