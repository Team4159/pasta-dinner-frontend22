import { Typography } from "@mui/material"
import { Box } from "@mui/system"

const styles = {
    backgroundColor:"red",
    minHeight:"6em"
}
const Header = ():JSX.Element => {
    return (
        <Box sx={styles}>
            <Typography>Insert Logo and Title here</Typography>
        </Box> 
    ) 
}
export default Header