import { Box, Typography } from '@mui/material';
import {FolderZip, CopyAll as Multiple} from '@mui/icons-material'
import React from 'react';
import { DocViewer } from './DocViewer';

export interface FileViewerFile {
    url?: string;
    mimeType?: string;
    extension?: string;
}

export interface FileViewerProps {
    files: FileViewerFile[]

    token?: string;
}

export const FileViewer: React.FC<FileViewerProps> = ({
    files = [],
    token
}) => {
    if (files && files.length == 1) {
        let file = files[0]
        let mimetype = file.mimeType ? file.mimeType : 'text/plain'
        console.log(file)
        let url = file.url // `${process.env.REACT_APP_API && process.env.REACT_APP_API.length > 0 ? process.env.REACT_APP_API : window.location.origin}/api/files/${file.id}${file?.extension ? file?.extension : ''}?access_token=${token}`;

        let main = mimetype.split('/')[0];
        let sub = mimetype.split('/')[1];

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
                        console.log(url, `${main}/${sub}`)
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

    } else {
        return (
            <Box
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