import { Typography, Paper, Slide } from "@mui/material"
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
        whiteSpace:"normal",
        flexWrap:'wrap'
        //whiteSpace:"normal" 
    } as CSSProperties,
    title: {
        color:"white",
        fontWeight:"bold",
        fontSize:"2em", //Issue for mobile here, change flex dir and size for mobile view
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
        <Slide in direction={'down'} mountOnEnter timeout={{enter:1000}}>
            <Box sx={styles.bg}>
                <Slide in direction={'down'} mountOnEnter timeout={{enter:1500}}>
                    <Box>
                        <img alt="Team logo" src={teamlogo} style={styles.img}/>
                        <Typography sx={styles.title}>Cardinalbotics 2021 Pasta Picnic</Typography>
                    </Box>
                </Slide>
            </Box> 
        </Slide>
    ) 
}
export default Header