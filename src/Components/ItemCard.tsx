import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Container, Fade, Grid, Paper, Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component, createRef, CSSProperties, RefObject } from "react";
import placeholder from "../Images/placeholder.jpg"
import ExpandMore from '@mui/icons-material/ExpandMore';

type ItemCardState = { //capitalize first letter for each word in itemName, add decimals*
    timeLeft?:number;
    isExpanded:boolean;
    heightRef:any //RefObject<number>
}
type ItemCardProps = {
    id?:number;
    itemName?:string;
    topBid?:number;
    startingPrice?:number;
    description?:string;
    handleDialogOpen: (cardID?:number) => void;
    handleRetractDialogOpen: (cardID?:number) => void;
    name:string;
    imageName?:string

    highestBidder?:string

    isExpanded:boolean
    setIsExpanded: (b:boolean) => void
}
class ItemCard extends Component< Readonly<ItemCardProps>, Readonly<ItemCardState> > {
    private heightRef: RefObject<any>
    constructor(props:ItemCardProps){
        super(props);
        this.heightRef = createRef()
        this.state = {
            timeLeft: undefined,
            isExpanded:false,
            heightRef: this.heightRef
        }
    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps:ItemCardProps, prevState:ItemCardState){
       if(this.heightRef.current.clientHeight > 420) console.log("State changed 420")
       else if(this.heightRef.current.clientHeight >= 420) console.log("State changed above")  
        
    }
    handleIsExpanded = ():boolean => {    
        this.setState({isExpanded: !this.state.isExpanded}, () => {
            this.props.setIsExpanded(this.state.isExpanded)
        }) //Fix here
        return this.state.isExpanded
    }
    getFormattedPrice = (price:number):string => `${price}`.includes(".") ? `${price}`:`${price}.00` //Sam said get rid of cents?
    
    render():JSX.Element {
        const {description, handleDialogOpen, handleRetractDialogOpen, topBid, itemName, startingPrice, id, name, imageName, highestBidder} = this.props
        return(
            <Fade in appear mountOnEnter timeout={{enter:1500}}>
                <Card ref={this.heightRef} sx={styles.card}>
                    <Grid>
                        <CardMedia style={styles.media} component={"img"} image={imageName? `https://pastadinner.lren.cf/src/images/${imageName}`:placeholder} alt={"Image placeholder"}/>
                    </Grid>
                    <CardContent>
                        <Typography variant={"h5"} align={"center"}>
                            <Box component={"span"} sx={styles.name}>{itemName ? `#${id} ${itemName}`:"Item Title"}</Box>
                        </Typography>
                        <Typography align={"center"}>{startingPrice ? `Starting Price - $${this.getFormattedPrice(startingPrice)}`:"Starting Price - N/A"}</Typography>
                        <Typography align="center">{topBid ? `Top Bid - ${highestBidder}: $${this.getFormattedPrice(topBid)}`:"Top Bid - N/A"}</Typography>
                        <CardActions>
                            <Button sx={styles.button}onClick={() => handleDialogOpen(id)}>Enter Bid</Button>
                            <Button sx={styles.button} onClick={() => handleRetractDialogOpen(id)}>Retract Bid</Button>
                        </CardActions>
                        <Box component={"div"} sx={styles.expandMore}><ExpandMore onClick={this.handleIsExpanded}/></Box> {/* add rotate transition*/}
                        <Collapse in={this.props.isExpanded/* this.state.isExpanded */} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph fontSize={".9em"}>{description}</Typography>
                                {/* <Typography paragraph fontSize={".9em"}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt modi optio 
                                    unde architecto nihil adipisci magnam 
                                </Typography> */}
                            </CardContent>
                        </Collapse>         
                    </CardContent>
                </Card>
            </Fade>
        )
    }
}
const styles = {
    card: {
        maxWidth:"15em",
        minWidth:"15em",
        margin:"1.5em",
        padding:"1em",
        minHeight: "315px",
    },
    name: {
        fontWeight:"bold"
    },
    expandMore: {
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"flex-end",
        //border:"1px solid black",
        transform:"translate(7%,1.5em)"
    }, 
    media: {
        height:"10em",
    } as CSSProperties,
    button: {
        color:'#de1738'
    }
}
export default ItemCard