import { Card, CardContent, Paper, Typography } from "@mui/material"

type InstructionCardProps = {
    id:number;
    description:string;
}
const styles = {

}
const InstructionCard = (props:InstructionCardProps):JSX.Element => {
    return (
        <Card>
            <CardContent>
            <Paper>
                <Typography>{props.id}</Typography>
            </Paper>
            <Typography>
                <Typography>{props.description}</Typography>
            </Typography>
            </CardContent>
        </Card>
    )
}
export default InstructionCard