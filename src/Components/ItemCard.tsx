import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Component } from "react";
import placeholder from "../Images/placeholder.jpg"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type ItemCardState = {
    timeLeft?:number;
    isExpanded:boolean;
}
type ItemCardProps = {
    itemName?:string;
    topBid?:number;
    startingPrice?:number;
    handleDialogOpen: () => void;
}
class ItemCard extends Component<ItemCardProps,ItemCardState> {
    constructor(props:ItemCardProps){
        super(props);
        this.state = {
            timeLeft: undefined,
            isExpanded:false
        }
    }
    componentDidMount():void {

    }
    render():JSX.Element {
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
                        <Button onClick={this.props.handleDialogOpen}>Enter Bid</Button>
                        <Button onClick={() => {}}>Retract Bid</Button>
                    </CardActions>
                    <ExpandMoreIcon/>
                    <Collapse>
                    
                    </Collapse>
                    {/*<Typography paragraph fontSize={".9em"}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt modi optio 
                        unde architecto nihil adipisci magnam 
                    </Typography> */}
                    
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
        maxHeight:"300px"
    },
    name: {
        fontWeight:"bold"
    }
}
export default ItemCard