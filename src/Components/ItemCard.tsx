import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import placeholder from "../Images/placeholder.jpg"
import ExpandMore from '@mui/icons-material/ExpandMore';

type ItemCardState = { //capitalize first letter for each word in itemName, add decimals*
    timeLeft?:number;
    isExpanded:boolean;
}
type ItemCardProps = {
    id?:number;
    itemName?:string;
    topBid?:number;
    startingPrice?:number;
    description?:string;
    handleDialogOpen: (cardID?:number) => void;
    handleRetractDialogOpen: (cardID?:number) => void;
}
class ItemCard extends Component< Readonly<ItemCardProps>, Readonly<ItemCardState> > {
    constructor(props:ItemCardProps){
        super(props);
        this.state = {
            timeLeft: undefined,
            isExpanded:false
        }
    }
    handleIsExpanded = ():boolean => {
        this.setState({isExpanded: !this.state.isExpanded})
        return this.state.isExpanded
    }
    getFormattedPrice = (price:number):string => `${price}`.includes(".") ? `${price}`:`${price}.00` //Sam said get rid of cents?
    
    render():JSX.Element {
        const {description, handleDialogOpen, handleRetractDialogOpen, topBid, itemName, startingPrice, id} = this.props
        return(
            <Card sx={styles.card}>
                <CardMedia component={"img"} image={placeholder} alt={"Image placeholder"}/>
                <CardContent>
                    <Typography variant={"h5"} align={"center"}>
                        <Box component={"span"} sx={styles.name}>{itemName ? `#${id} ${itemName}`:"Item Title"}</Box>
                    </Typography>
                    <Typography align={"center"}>{startingPrice ? `Starting Price - $${this.getFormattedPrice(startingPrice)}`:"Starting Price - N/A"}</Typography>
                    <Typography align="center">{topBid ? `Top Bid - $${this.getFormattedPrice(topBid)}`:"Top Bid - N/A"}</Typography>
                    <CardActions>
                        <Button onClick={() => handleDialogOpen(id)}>Enter Bid</Button>
                        <Button onClick={() => handleRetractDialogOpen(id)}>Retract Bid</Button>
                    </CardActions>
                    <Box component={"div"} sx={styles.expandMore}><ExpandMore onClick={this.handleIsExpanded}/></Box> {/* add rotate transition*/}
                    <Collapse in={this.state.isExpanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography>{description}</Typography>
                            <Typography paragraph fontSize={".9em"}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt modi optio 
                                unde architecto nihil adipisci magnam 
                            </Typography>
                        </CardContent>
                    </Collapse>         
                </CardContent>
            </Card>
            
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
    }
}
export default ItemCard