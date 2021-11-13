import { Card, CardContent, Paper, Slide, Typography } from "@mui/material"
import { CSSProperties } from "react"

type InstructionCardProps = {
    id:number;
}
//The descriptions have to be the same number of lines or else the big number becomes misaligned, fix later or not
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
        minWidth:"16em",
        margin:"1em",
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
                return "Browse for an item you like. Then click on bid to enter your bid, name, and contact info. Bids must be $2 higher than the previous and in whole dollars only"
            }
            case 2: {
                return "If you enter the wrong amount, you can retract your bid and enter a new one by clicking on retract bid and entering your name and the amount you bid by accident."
            }
            case 3: {
                return "All bids must be entered by the end of the auction on November 13 at 2:00PM. After the picnic, you will be contacted to receive and pay for your item."
            }
            default: {
                return "Info on how to submit bids and how much time is left+2 dollar rule+retract bid. Stop cringing, I can see you"
            }
        }
    }
    return (
        <Slide in direction={'right'} mountOnEnter timeout={{enter:1500}}>
            <Card sx={styles.container}> 
                <CardContent sx={styles.card}>
                    <Paper sx={styles.paper}>
                        <Typography sx={styles.number}>{props.id}</Typography>
                    </Paper>
                    <Typography sx={styles.desc}>
                        {showDescriptionById(props.id)} 
                    </Typography>
                </CardContent>
            </Card>
        </Slide>
    )
}
export default InstructionCard