import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Component } from "react";
import placeholder from "../Images/placeholder.jpg"
import ExpandMore from '@mui/icons-material/ExpandMore';

type ItemCardState = {
    timeLeft?:number;
    isExpanded:boolean;
}
type ItemCardProps = {
    itemName?:string;
    topBid?:number;
    startingPrice?:number;
    description?:string;
    handleDialogOpen: () => void;
    handleRetractDialogOpen: () => void;
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
    componentDidMount():void {

    }
    render():JSX.Element {
        const {description, handleDialogOpen, handleRetractDialogOpen} = this.props
        return(
            <Card sx={styles.card}>
                <CardMedia component={"img"} image={placeholder} alt={"Image placeholder"}/>
                <CardContent>
                    <Typography variant={"h5"} align={"center"}>
                        <Box component={"span"} sx={styles.name}>Item Title</Box>
                    </Typography>
                    <Typography align={"center"}>Starting Price - $XX.XX</Typography>
                    <Typography align="center">Top Bid - $XX.XX</Typography>
                    <CardActions>
                        <Button onClick={handleDialogOpen}>Enter Bid</Button>
                        <Button onClick={handleRetractDialogOpen}>Retract Bid</Button>
                    </CardActions>
                    <Box component={"div"} sx={styles.expandMore}><ExpandMore onClick={this.handleIsExpanded}/></Box>
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