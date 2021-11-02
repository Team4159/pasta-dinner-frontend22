import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { ReactNode } from "react"

type InstructionsProps = {
    children: ReactNode[]
}
const styles = {
    border: '1px dashed grey',
    minHeight:"16em"
}
const Instructions = (props:InstructionsProps):JSX.Element => <Box sx={styles}>{props.children}</Box>
    
export default Instructions