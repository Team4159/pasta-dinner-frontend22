import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const styles = {
    border: '1px dashed grey',
    minHeight:"16em"
}
const Instructions = ():JSX.Element => {
    return (
        <Box sx={styles}>
            <Typography>Insert instructions here</Typography>
        </Box>
    )
}
export default Instructions