import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { CSSProperties, ReactNode } from "react"

type InstructionsProps = {
    children: ReactNode[]
}
const styles = {
    border: '1px dashed grey',
    minHeight:"16em",
    display:"flex",
    flexWrap:"wrap",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-evenly"
} as CSSProperties
const Instructions = (props:InstructionsProps):JSX.Element => <Box sx={styles}>{props.children}</Box>
    
export default Instructions