import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import teamlogo from '../Images/4159-logo.png'

const styles = {
    bg: {
        backgroundColor:"#700006",
        minHeight:"6em",
    },
    title: {
        color:"white"
    }
    
}
const Header = ():JSX.Element => {
    return (
        <Box sx={styles.bg}>
            <img alt="Team logo" src={teamlogo}/>
            <Typography sx={styles.title}>Cardinalbotics 2021 Pasta Picnic</Typography>
        </Box> 
    ) 
}
export default Header