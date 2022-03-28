import { Box } from "grommet"
import React from "react"

export interface HeaderBoxProps {
    header: JSX.Element
}

export const HeaderBox : React.FC<HeaderBoxProps> = (props) => {
    return (
        <Box 
            flex
            overflow={'hidden'}
            round="xsmall"
            background={'neutral-1'}>
            <Box pad="xsmall" background={'accent-2'}>
                {props.header}
            </Box>
            <Box flex>
                {props.children}
            </Box>
        </Box>
    )
}