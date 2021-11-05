import { Card, CardContent, Paper, Typography } from "@mui/material"
import { CSSProperties } from "react"

type InstructionCardProps = {
    id:number;
    description:string;
}
const styles = {
    paper: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:"50%",
        width:"5em",
        height:"5em",
       
    },
    card: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        backgroundColor:"#f5f5f5",
        minHeight:"17em",
    } as CSSProperties,
    container:{
        maxWidth:"16em",
        margin:"1em"
    } as CSSProperties,
    number:{
        fontWeight:"bold",
        fontSize:"3.5em",
        color:"#de1738",
    },
    desc: {
        textAlign:"center",
        marginTop:"2em"
    } as CSSProperties
}
const InstructionCard = (props:InstructionCardProps):JSX.Element => { //maybe return jsx instead
    const getRemainingTime = ():string => {
        let currentTime:Date = new Date()
        let deadline:Date = new Date() //Nov 13 at 2:00PM
        let timeLeft:string | null = null
        setInterval(():void => {

        }, 1000)
        return ``
    }
    const showDescriptionById = (id:number):string => {
        switch(id){
            case 1: {
                return ""
            }
            case 2: {
                return ""
            }
            case 3: {
                return ""
            }
            default: {
                return "Info on how to submit bids and how much time is left+2 dollar rule+retract bid. Stop cringing, I can see you"
            }
        }
    }
    return (
        <Card sx={styles.container}>
            <CardContent sx={styles.card}>
            <Paper sx={styles.paper}>
                <Typography sx={styles.number}>{props.id}</Typography>
            </Paper>
            <Typography sx={styles.desc}>
                {showDescriptionById(0)}
            </Typography>
            </CardContent>
        </Card>
    )
}
export default InstructionCard