import { Typography, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { CSSProperties } from "react"
import teamlogo from '../Images/4159-logo.png'

const styles = {
    bg: {
        backgroundColor:"#700006",
        //minHeight:"6em",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        paddingRight:"1em",
        padding:".5em",
        minHeight:"2em",
        whiteSpace:"normal"
        //whiteSpace:"normal" 
    } as CSSProperties,
    title: {
        color:"white",
        fontWeight:"bold",
        fontSize:"1.7em", //Issue for mobile here
        //position:"absolute",
        //left:"50%",
        //transform:"translate(-50%,0)",
        padding:"1em"
    } as CSSProperties,
    img: {
        float:"left",
        //transform:"scale(-10%,-10%)"
        width:"auto",
        height:"auto"
    } as CSSProperties,
}
const Header = ():JSX.Element => {
    return (
        <Box sx={styles.bg}>
            <img alt="Team logo" src={teamlogo} style={styles.img}/>
            <Typography sx={styles.title}>Cardinalbotics 2021 Pasta Picnic</Typography>
        </Box> 
    ) 
}
export default Header