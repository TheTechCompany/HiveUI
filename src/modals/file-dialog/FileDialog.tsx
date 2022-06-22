import React, {
  useEffect, useState
} from 'react';


import moment from 'moment';

import { Text, Select, Heading, Box, Layer, TextInput } from 'grommet'
// import './file-dialog.css';
import { dateFromObjectID } from '@hexhive/utils'
import { FileViewer, FileViewerFile } from '../../components';
import { FileContent } from './FileContent';
import { isEqual } from 'lodash';
import { BaseModal } from '../base-modal';

import { CloseFullscreen, Download, Expand, Fullscreen } from '@mui/icons-material'
import { IconButton, Button, TextField, Typography } from '@mui/material'

export interface FileDialogFile extends FileViewerFile {
  name?: string;
  timestamp?: Date;
  owner?: {
    name?: string;
  }
}
export interface FileDialogProps {
  open: boolean;
  onClose?: any;

  onSubmit?: (files: any[]) => void;
  onDownload?: () => void;

  job?: any;
  files?: FileDialogFile[];

  token?: string;

}

export const FileDialog: React.FC<FileDialogProps> = (props) => {

  const [expanded, setExpanded] = useState<boolean>(false);

  const [files, setFiles] = useState<FileDialogFile[]>([])

  useEffect(() => {
    console.log(props.files)
    if (props.files && !isEqual(files, props.files)) {
      setFiles(props.files)
    }
  }, [props.files])

  /*
   * Make this handle all files properly
   */
  const downloadFile = () => {
    props.onDownload?.();

    // let files = props.files;
    // if (files && files.length == 1) {
    //   let file = files[0]
    //   // utils.job.getFile(props.job, `${file?._id}${file?.extension ? file.extension : ''}`).then((r) => {
    //   //   if(r){
    //   //     download(r, `${file?.name}${file?.extension ? file.extension : ''}`, file?.mimeType);
    //   //   }
    //   // })
    // } else {
    //   //TODO download batch
    // }
  }

  const onSubmit = () => {
    if (files) {
      //console.log(props.file)
      props.onSubmit?.(files)
    }

    onClose()
    /*()
      let update: any = {
        ...file
      }
      utils.job.updateFile(props.job, props.file.id, update).then((resp) => {
        console.log("Updated", resp)
      })
      onClose()*/
  }

  const onClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  }


  const updateFile = (key: string, value: any) => {
    let f = files.slice()

    if (f.length == 1) {
      f[0] = {
        ...f[0],
        [key]: value
      }
    } else if (f.length > 1) {
      if (key == 'status') {
        f = f.map((x) => ({ ...x, [key]: value }))
      }
    }

    setFiles(f)
  }


  const file = files.length == 1 ? files[0] : {
    id: ' ',
    name: "Multiple files",
    mimeType: "Mutliple",
    owner: { name: "Multiple uploaders" },
    // status: files[0] ? files[0].status : '',
    timestamp: 0
  }
  return <BaseModal
    title={(
      <Box
        pad="small"
        margin={{ bottom: 'small' }}
        background="accent-2"
        align="center"
        direction="row"
        justify="between">
        <Heading level='4' margin={{ bottom: 'none', top: 'none' }}>File Details</Heading>

        <div>
          {files?.length > 0 ? (
            <IconButton size="small" onClick={downloadFile} >
              <Download fontSize='inherit' sx={{ color: "white" }} />
            </IconButton>
          ) : null}
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}>
            {!expanded ? <Fullscreen fontSize='inherit' sx={{ color: "white" }} /> : <CloseFullscreen fontSize='inherit' sx={{color: 'white'}} />}
          </IconButton>
        </div>
      </Box>

    )}
    open={props.open}
    onClose={onClose}>

    <Box
      width={'50vw'}
      pad={{ horizontal: "xsmall" }}
      flex
      direction="row">
      <div style={{ flex: 1, marginRight: 5, display: 'flex', flexDirection: 'column' }}>
        <FileContent files={files} token={props.token} />

      </div>
      <div style={{
        overflow: 'hidden',
        width: expanded ? '0px' : 'auto',
        transition: 'flex 250ms ease-in',
        flex: expanded ? 0 : 1,
        marginLeft: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>

        <Box
          gap="small"
          direction="column">
          <TextField
            size='small'
            placeholder="File title"
            onChange={(e) => updateFile('name', e.target.value)}
            value={file?.name} />

        </Box>
        <div
          style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          {/* <Text style={{textAlign: 'start', color: 'gray'}}>File type: {file && file.mimeType}</Text> */}
          <Typography fontSize={"small"} style={{ color: 'gray' }}>Uploaded By: {file && file.owner && file.owner?.name}</Typography>
          {file.timestamp && <Typography fontSize="small" style={{ color: 'gray' }}>Upload Date: {file && moment(file.timestamp).format("hh:mma DD/MM/YYYY")}</Typography>}
        </div>
      </div>

    </Box>

  </BaseModal>

}

// export const FileDialog = connect((state: StoreState) => {
//   console.log(state)
//   return {
//   token: state.auth.token
//   }
// })(BaseFileDialog)
